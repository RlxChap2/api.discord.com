window.webpackChunkdiscord_app.forEach((element) => {
    console.log(element);
});

window.webpackChunkdiscord_app.forEach((chunk) => {
    const modules = chunk[1] || chunk[0];
    if (modules && typeof modules === 'object') {
        Object.entries(modules).forEach(([key, moduleFunction]) => {
            try {
                console.log(`Module ${key}:`, moduleFunction.toString());
            } catch (err) {
                console.log(`Error accessing module ${key}`);
            }
        });
    }
});
