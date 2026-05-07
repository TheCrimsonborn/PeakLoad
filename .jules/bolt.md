# Bolt's Journal
19:35-07/05/2024 : [DOM Insertion Optimization]
    Learning: Discovered an anti-pattern in the codebase where table generation logic repetitively appended elements synchronously to the DOM inside loops, triggering multiple layout thrashing events.
    Action: Used `DocumentFragment` to batch DOM insertions within rendering loops, a pattern to consistently enforce in similar future UI updates across the codebase.
