<script lang="ts">
	import type { Recipe } from '$lib/types';
	
	interface Props {
		recipes: Recipe[];
		onSelect: (recipe: Recipe) => void;
		onGenerate?: () => void;
	}
	
	let { recipes, onSelect, onGenerate }: Props = $props();
	
	let searchQuery = $state('');
	
	const filteredRecipes = $derived(
		searchQuery.trim() === '' 
			? recipes 
			: recipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
	);
</script>

<div class="meal-selector">
	<div class="search-box">
		<input
			type="text"
			placeholder="Search meals..."
			bind:value={searchQuery}
		/>
	</div>
	
	{#if onGenerate}
		<button class="generate-btn" onclick={onGenerate}>
			🎲 Generate Suggestions
		</button>
	{/if}
	
	<div class="recipe-list">
		{#if filteredRecipes.length === 0}
			<div class="empty">
				{#if searchQuery}
					<p>No meals found matching "{searchQuery}"</p>
				{:else}
					<p>No meals available</p>
				{/if}
			</div>
		{:else}
			{#each filteredRecipes as recipe}
				<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
				<div class="recipe-card" onclick={() => onSelect(recipe)}>
					<div class="recipe-info">
						<h3>{recipe.name}</h3>
						{#if recipe.prep_time || recipe.cook_time}
							<span class="time">
								{#if recipe.prep_time}Prep: {recipe.prep_time}m{/if}
								{#if recipe.prep_time && recipe.cook_time} • {/if}
								{#if recipe.cook_time}Cook: {recipe.cook_time}m{/if}
							</span>
						{/if}
					</div>
					{#if recipe.is_favorite}
						<span class="favorite">★</span>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.meal-selector {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.search-box input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		font-size: 1rem;
	}
	
	.search-box input:focus {
		outline: none;
		border-color: #007bff;
	}
	
	.generate-btn {
		width: 100%;
		padding: 0.75rem;
		background: #f0f8ff;
		border: 2px dashed #007bff;
		border-radius: 0.5rem;
		color: #007bff;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.generate-btn:hover {
		background: #e0f0ff;
	}
	
	.recipe-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 400px;
		overflow-y: auto;
	}
	
	.recipe-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid #e0e0e0;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	.recipe-card:hover {
		border-color: #007bff;
		background: #f8f9ff;
	}
	
	.recipe-info h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1rem;
		font-weight: 500;
	}
	
	.time {
		font-size: 0.8rem;
		color: #666;
	}
	
	.favorite {
		color: #ffc107;
		font-size: 1.25rem;
	}
	
	.empty {
		text-align: center;
		padding: 2rem;
		color: #666;
	}
</style>
