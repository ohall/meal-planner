export interface Database {
	public: {
		Tables: {
			recipes: {
				Row: {
					id: string;
					household_id: string;
					name: string;
					description: string | null;
					ingredients: unknown;
					instructions: string | null;
					prep_time: number | null;
					cook_time: number | null;
					servings: number | null;
					is_favorite: boolean;
					is_disliked: boolean;
					last_planned_at: string | null;
					times_served: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					household_id: string;
					name: string;
					description?: string | null;
					ingredients?: unknown;
					instructions?: string | null;
					prep_time?: number | null;
					cook_time?: number | null;
					servings?: number | null;
					is_favorite?: boolean;
					is_disliked?: boolean;
					last_planned_at?: string | null;
					times_served?: number;
					created_at?: string;
					updated_at?: string;
				};
				Update: Partial<Database['public']['Tables']['recipes']['Insert']>;
			};
			prompt_settings: {
				Row: {
					household_id: string;
					positive_prompts: string[];
					avoid_prompts: string[];
					cuisines: string[];
					pantry_staples: string[];
					dietary_preferences: string[];
					max_prep_minutes: number;
					servings: number;
					notes: string;
					updated_at: string;
				};
				Insert: {
					household_id: string;
					positive_prompts?: string[];
					avoid_prompts?: string[];
					cuisines?: string[];
					pantry_staples?: string[];
					dietary_preferences?: string[];
					max_prep_minutes?: number;
					servings?: number;
					notes?: string;
					updated_at?: string;
				};
				Update: Partial<Database['public']['Tables']['prompt_settings']['Insert']>;
			};
			meal_assignments: {
				Row: {
					id: number;
					household_id: string;
					day_index: number;
					day_name: string;
					recipe_id: string;
					recipe_name: string;
					source: 'saved' | 'generated';
					saved_at: string;
				};
				Insert: {
					id?: number;
					household_id: string;
					day_index: number;
					day_name: string;
					recipe_id: string;
					recipe_name: string;
					source: 'saved' | 'generated';
					saved_at?: string;
				};
				Update: Partial<Database['public']['Tables']['meal_assignments']['Insert']>;
			};
		};
	};
}
