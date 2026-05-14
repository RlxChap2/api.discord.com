# Module Discovery

Module discovery is the process of finding a useful module without relying on Webpack's unstable internal IDs. Good filters identify a module by behavior or structure instead of position.

## Filter Types

**Property filters**  
Match modules that expose a specific set of keys. This is usually the first choice for stores and utility objects.

**Display-name filters**  
Match React components or named exports with a `displayName`.

**Store-name filters**  
Match Flux stores by constructor name or a `getName()` method when available.

**String filters**  
Match functions or modules whose source contains distinctive strings. These are useful when keys are minified but labels, action names, or route fragments remain.

**Prototype filters**  
Match class-style components or objects that expose methods on their prototype.

## Candidate Search Helper

The helper below is intentionally read-only. It returns candidates for inspection and skips values that throw during property access.

```js
function getExports(moduleRecord) {
  if (!moduleRecord || !moduleRecord.exports) return [];

  const root = moduleRecord.exports;
  const values = [root];

  if (typeof root === "object" || typeof root === "function") {
    for (const key of Object.keys(root)) {
      try {
        values.push(root[key]);
      } catch {
        // Some exports use getters that throw outside normal runtime paths.
      }
    }
  }

  return values.filter(Boolean);
}

function findCandidates(moduleCache, predicate, limit = 25) {
  const matches = [];

  for (const record of Object.values(moduleCache)) {
    for (const value of getExports(record)) {
      try {
        if (predicate(value)) matches.push(value);
      } catch {
        continue;
      }

      if (matches.length >= limit) return matches;
    }
  }

  return matches;
}
```

Example property filter:

```js
const hasKeys = (...keys) => (value) =>
  value && keys.every((key) => Object.prototype.hasOwnProperty.call(value, key));

const candidates = findCandidates(moduleCache, hasKeys("getName", "addChangeListener"));
console.table(candidates.map((value) => ({
  name: typeof value.getName === "function" ? value.getName() : value.displayName,
  keys: Object.keys(value).slice(0, 8).join(", "),
})));
```

## Better Filters

A good filter is specific enough to avoid false positives and broad enough to survive normal builds.

Prefer:

- Two or three related property names instead of one generic property.
- Store names plus method checks.
- Component names plus expected prop behavior.
- Strings that describe UI labels, routes, or action names.

Avoid:

- Numeric module IDs.
- Single-letter minified names.
- One very common method such as `open`, `get`, `set`, or `render`.
- Authentication, payment, and private-message targets.

## Validating A Match

Once a filter returns candidates, validate them without changing application state:

- Inspect the object shape with `console.dir`.
- Read non-sensitive metadata such as `displayName`, `getName()`, or method names.
- Pretty-print function definitions and compare nearby call sites.
- Trigger the UI naturally and watch whether the candidate is used.

Do not validate a module by sending messages, changing settings, creating invites, modifying experiments, or touching credentials.

## Version Notes

Record the date, Discord build, environment, lazy-load trigger, and filter. Future you will appreciate the breadcrumb trail when an update breaks a lookup.
