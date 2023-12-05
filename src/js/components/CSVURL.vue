<script setup>
</script>

<template>
    <h3>Add CSV file from URL</h3> 
    <ul>
        <li>The first column should contain dates</li>
        <li>The subsequent columns may contain one series per column</li>
        <li>A column's head will be used as the serie's name</li>
    </ul>
    <div class="field has-addons mb-6">
        <div class="control is-expanded">
            <input class="input" type="text" placeholder="URL">
        </div>
        <div class="control">
            <a class="button is-info">
                Load
            </a>
        </div>
    </div>
</template>