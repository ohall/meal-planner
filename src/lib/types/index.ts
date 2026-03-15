// Type definitions for Meal Planner

export interface User {
	id: string;
	email: string;
	created_at: string;
}

export interface Household {
	id: string;
	name: string;
	created_by: string;
	created_at: string;
}

export interface HouseholdMember {
	id: string;
	household_id: string;
	user_id: string;
	role: 'owner' | 'member';
	joined_at: string;
}

export interface Recipe {
	id: string;
	household_id: string;
	name: string;
	ingredients: Ingredient[];
	instructions?: string;
	prep_time?: number;
	cook_time?: number;
	servings?: number;
	image_url?: string;
	is_favorite: boolean;
	created_at: string;
	updated_at: string;
}

export interface Ingredient {
	name: string;
	amount?: string;
	unit?: string;
	category?: string;
}

export interface MealPlan {
	id: string;
	household_id: string;
	week_start_date: string;
	created_at: string;
	updated_at: string;
}

export interface Meal {
	id: string;
	plan_id: string;
	day_of_week: number; // 0 = Monday, 6 = Sunday
	recipe_id: string;
	status: 'suggested' | 'confirmed' | 'skipped';
	created_at: string;
}

export interface ShoppingListItem {
	id: string;
	household_id: string;
	name: string;
	category: string;
	quantity: string;
	checked: boolean;
	source_meal_id?: string;
	is_misc: boolean;
	created_at: string;
	updated_at: string;
}

export interface DietaryPreference {
	id: string;
	household_id: string;
	preference_type: 'restriction' | 'preference';
	name: string;
	value: string;
}
