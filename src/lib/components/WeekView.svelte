<script lang="ts">
	import DayCard from './DayCard.svelte';
	import type { Meal } from '$lib/types';
	
	interface Props {
		meals: Meal[];
	}
	
	let { meals }: Props = $props();
	
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	
	function getMealForDay(dayIndex: number): Meal | undefined {
		return meals.find(m => m.day_of_week === dayIndex);
	}
	
	function handleDaySelect(day: string) {
		console.log('Selected:', day);
		// TODO: Open meal selection modal
	}
</script>

<div class="week-view">
	<h2>This Week</h2>
	<div class="days-grid">
		{#each days as day, index}
			<DayCard 
				{day} 
				meal={getMealForDay(index)}
				onSelect={() => handleDaySelect(day)}
			/>
		{/each}
	</div>
</div>

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
