<script lang="ts">
	import type { Meal } from '$lib/types';
	
	interface Props {
		day: string;
		meal?: Meal;
		mealName?: string;
		onSelect: () => void;
	}
	
	let { day, meal, mealName, onSelect }: Props = $props();
</script>

<button class="day-card" onclick={onSelect}>
	<div class="day-name">{day}</div>
	{#if mealName}
		<div class="meal-name">{mealName}</div>
	{:else}
		<div class="empty">
			<span class="add-icon">+</span>
			<span>Tap to add meal</span>
		</div>
	{/if}
</button>

<style>
	.day-card {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border: 1px solid #e0e0e0;
		border-radius: 0.5rem;
		background: white;
		text-align: left;
		cursor: pointer;
	}
	
	.day-card:hover {
		border-color: #007bff;
	}
	
	.day-name {
		font-weight: 600;
		font-size: 0.875rem;
		text-transform: uppercase;
		color: #666;
		margin-bottom: 0.5rem;
	}
	
	.meal-name {
		font-size: 1rem;
		color: #333;
	}
	
	.empty {
		font-size: 0.875rem;
		color: #999;
		font-style: italic;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.add-icon {
		font-size: 1.25rem;
		font-weight: 600;
	}
</style>
