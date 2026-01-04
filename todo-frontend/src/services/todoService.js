import { supabase } from '../supabaseClient';

const classifyWithMemory = async (title) => {
    const cleanTitle = title.toLowerCase().trim();
    if (!cleanTitle) return 'PERSONAL';
    try {
        const { data: remembered } = await supabase
            .from('ai_cache')
            .select('category')
            .eq('phrase', cleanTitle)
            .maybeSingle();
        if (remembered) return remembered.category;
    } catch (e) {
        console.error(e);
    }
    const keywords = {
        URGENT: ['urgent', 'boss', 'asap', 'deadline', 'priority'],
        WORK: ['work', 'meeting', 'email', 'code', 'project', 'client']
    };
    if (keywords.URGENT.some(k => cleanTitle.includes(k))) return 'URGENT';
    if (keywords.WORK.some(k => cleanTitle.includes(k))) return 'WORK';
    return 'PERSONAL';
};

export const todoService = {
    async getAll() {
        const { data, error } = await supabase
            .from('todos')
            .select(`id, title, is_completed, status, is_recovered, category_id, categories (name)`)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return { data };
    },

    async create(title, categoryName = 'PERSONAL') {
        const systemFilters = ['ALL', 'ACTIVE', 'DONE', 'RECOVERED']; 
        let target = categoryName.toUpperCase().trim();
        if (systemFilters.includes(target)) {
            target = await classifyWithMemory(title);
        }
        const { data: cat } = await supabase
            .from('categories')
            .select('id')
            .eq('name', target)
            .maybeSingle();
        const { data, error } = await supabase
            .from('todos')
            .insert([{ 
                title, 
                is_completed: false,
                status: 'active', 
                is_recovered: false,
                category_id: cat?.id || '2ff23eda-d5d3-4af3-b975-285172b85172' 
            }])
            .select(`id, title, is_completed, status, is_recovered, categories (name)`)
            .single();
        if (error) throw error;
        supabase.from('ai_cache').upsert(
            { phrase: title.toLowerCase().trim(), category: target },
            { onConflict: 'phrase' }
        ).then(); 
        return { data };
    },

    async update(id, payload) {
    const { data, error } = await supabase
        .from('todos')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return { data };
    },

    async delete(id) {
        const { error } = await supabase
            .from('todos')
            .update({
                status: 'deleted',
                deleted_at: new Date().toISOString()
            })
            .eq('id', id);
        if (error) throw error;
    },
    
    async restore(id) {
        const { error } = await supabase 
            .from('todos')
            .update({
                status: 'active',
                is_recovered: 'true',
                deleted_at: null
            })
            .eq('id', id);
        if (error) throw error;
    },

    async permanentlyDelete(id) {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async deleteAll() {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('status', 'deleted');
        if (error) throw error;
    }
};