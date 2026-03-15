<script lang="ts">
	import DayCard from './DayCard.svelte';
	import Modal from './Modal.svelte';
	import MealSelector from './MealSelector.svelte';
	import type { Meal, Recipe } from '$lib/types';
	
	interface Props {
		meals?: Meal[];
		recipes?: Recipe[];
	}
	
	let { meals = [], recipes = [] }: Props = $props();
	
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	
	let selectedDayIndex = $state<number | null>(null);
	let isModalOpen = $state(false);
	
	// Track selected meals for each day (dayIndex -> recipeId)
	let selectedMeals = $state<Record<number, string>>({});
	
	let selectedDayName = $derived(
		selectedDayIndex !== null ? days[selectedDayIndex] : ''
	);
	
	// Temporary mock recipes for testing
	const mockRecipes: Recipe[] = [
		{ id: '1', household_id: '1', name: 'Spaghetti Carbonara', prep_time: 10, cook_time: 20, is_favorite: true, ingredients: [], created_at: '', updated_at: '' },
		{ id: '2', household_id: '1', name: 'Grilled Chicken Salad', prep_time: 15, cook_time: 15, is_favorite: false, ingredients: [], created_at: '', updated_at: '' },
		{ id: '3', household_id: '1', name: 'Beef Tacos', prep_time: 10, cook_time: 25, is_favorite: true, ingredients: [], created_at: '', updated_at: '' },
		{ id: '4', household_id: '1', name: 'Vegetable Stir Fry', prep_time: 10, cook_time: 15, is_favorite: false, ingredients: [], created_at: '', updated_at: '' },
		{ id: '5', household_id: '1', name: 'Homemade Pizza', prep_time: 30, cook_time: 20, is_favorite: true, ingredients: [], created_at: '', updated_at: '' },
	];
	
	let displayRecipes = $derived(recipes.length > 0 ? recipes : mockRecipes);
	
	// Map of recipeId -> recipe name for display
	let recipeMap = $derived(
		displayRecipes.reduce((map, recipe) => {
			map[recipe.id] = recipe.name;
			return map;
		}, {} as Record<string, string>)
	);
	
	function getMealNameForDay(dayIndex: number): string | undefined {
		const recipeId = selectedMeals[dayIndex];
		if (recipeId) {
			return recipeMap[recipeId] || 'Loading...';
		}
		return undefined;
	}
	
	function handleDaySelect(dayIndex: number) {
		selectedDayIndex = dayIndex;
		isModalOpen = true;
	}
	
	function handleCloseModal() {
		isModalOpen = false;
		selectedDayIndex = null;
	}
	
	function handleRecipeSelect(recipe: Recipe) {
		if (selectedDayIndex !== null) {
			selectedMeals[selectedDayIndex] = recipe.id;
		}
		handleCloseModal();
	}
	
	function handleGenerateSuggestions() {
		console.log('Generate suggestions for day:', selectedDayName);
		// TODO: Call API/LLM to generate suggestions
	}
</script>

<div class="week-view">
	<h2>This Week</h2>
	<div class="days-grid">
		{#each days as day, index}
			<DayCard 
				{day} 
				mealName={getMealNameForDay(index)}
				onSelect={() => handleDaySelect(index)}
			/>
		{/each}
	</div>
</div>

<Modal 
	isOpen={isModalOpen} 
	title={selectedDayName ? `Select Meal for ${selectedDayName}` : 'Select Meal'}
	onClose={handleCloseModal}
>
	<MealSelector 
		recipes={displayRecipes}
		onSelect={handleRecipeSelect}
		onGenerate={handleGenerateSuggestions}
	/>
</Modal>

<style>
	.week-view {
		padding: 1rem;
	}
	
	h2 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}
	
	.days-grid {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	
	@media (max-width: 640px) {
		.days-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
