# React Performance

## React Dev Tools Profiler

### Before optimization

1. Filtering countries by Antarctic region:

- Commit Duration: 2.7s
- Render Duration: 17.7ms

![filter](./public/filter1.png)
![filter](./public/filter2.png)
![filter](./public/filter3.png)

2. Sorting countries: first by name in descending order, then by population in descending order, then by population in ascending order:

- Commit Duration: 4.6s
- Render Duration: 1.5ms

![sort](./public/sort1.png)
![sort](./public/sort2.png)

3. Searching countries by 'ant':

- Commit Duration: 2.3s
- Render Duration: 0.5ms

![search](./public/search1.png)
![search](./public/search3.png)

### After optimization

1. Filtering countries by Antarctic region:

- Commit Duration: 2.4s
- Render Duration: 2.5ms

![filter](./public/op-filter1.png)
![filter](./public/op-filter2.png)
![filter](./public/op-filter3.png)

2. Sorting countries: first by name in descending order, then by population in descending order, then by population in ascending order:

- Commit Duration: 4.5s
- Render Duration: 0.9ms

![sort](./public/op-sort1.png)
![sort](./public/op-sort2.png)

3. Searching countries by 'ant':

- Commit Duration: 1.3s
- Render Duration: 0.8ms

![search](./public/op-search1.png)
![search](./public/op-search2.png)
![search](./public/op-search3.png)
