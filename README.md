## HW5 Performance Optimization

### Animation

- Added press scale animation to `BouquetCard` using React Native `Animated`.
- The card smoothly scales down on press and returns to normal size after release.

### Render Optimization

- Wrapped `BouquetCard` in `React.memo`.
- Added `useMemo` for responsive card width calculation in `HomeScreen`.
- Added `useCallback` for stable navigation and cart handlers in `HomeScreen`.
- Added `useMemo` in `CartScreen` for total price calculation.

### Dependency Optimization

- Checked `package.json` dependencies.
- No heavy libraries like `moment` or `lodash` are used.
- Added `dayjs` as a lightweight date utility alternative instead of `moment`.
