<script setup>
</script>

<template>
    <h3>Upload a CSV file</h3> 
    <ul>
        <li>The first column should contain dates</li>
        <li>The subsequent columns may contain one series per column</li>
        <li>A column's head will be used as the serie's name</li>
    </ul>
    <div class="file mb-6">
        <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
            <span class="file-label">
                Choose a file…
            </span>
            </span>
        </label>
    </div>
</template>