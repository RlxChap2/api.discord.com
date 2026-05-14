# React And Flux

React and Flux are the most useful way to move from "I clicked this UI" to "which module owns this behavior?" Start from what is visible, then walk toward the code.

## DOM To React

In Chromium DevTools:

1. Select an element in the Elements panel.
2. Use `$0` in the Console to inspect the selected DOM node.
3. Look for React fiber and props properties attached to the node.
4. Open event handlers or component functions from those props.
5. Pretty-print minified sources before reading them.

React property names include random suffixes, so do not document the exact suffix. Document the path and behavior instead.

## Breakpoints

Breakpoints are more reliable than guessing from minified names.

- Set a breakpoint inside a click handler, render function, or nearby source.
- Trigger the UI naturally.
- Inspect local variables, closure scopes, and call stacks.
- Store interesting objects as globals when DevTools offers that option.
- Compare the object keys to your module discovery filters.

This is especially useful when a short minified variable points to a real store, dispatcher, or utility object.

## Flux Stores

Discord's client uses Flux-style stores to hold local state. Stores are often easier to identify than UI components because they expose method sets and sometimes stable names.

Good store signals include:

- A `getName()` method or constructor display name.
- Read methods that expose local cached state.
- Listener methods such as `addChangeListener` and `removeChangeListener`.
- Hooks or selector functions that read from one or more stores.

::: warning Observe, do not mutate
Reading a store for shape and metadata is different from calling write methods or dispatching actions. Keep research read-only unless you are developing a plugin in a documented test environment.
:::

## Components

Components can be function components, class components, memoized components, or wrappers around other components. For research, the most useful details are:

- `displayName`.
- Props passed into the component.
- React element tree returned by a render function.
- Child nodes under `props.children`.
- Event callbacks attached to buttons, menus, and forms.

If you need to understand a component tree, use breadth-first or depth-first traversal helpers and inspect only the nodes you need.

## A Safe Investigation Pattern

1. Pick a visible UI element.
2. Inspect its React props and event handlers.
3. Pretty-print the handler source.
4. Pause execution while triggering the UI.
5. Identify captured objects, stores, and helper functions.
6. Build a trait-based filter for the module.
7. Validate the module through metadata and source reading.

This workflow comes from the same ideas used in BetterDiscord and plugin-development guides, but it is written here as a research process rather than a patching recipe.
