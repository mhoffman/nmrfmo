var end, ends, haversine, home, i, len, start;

haversine = require('haversine');

home = {
    latitude: 37.447852,
    longitude: -122.183173,
    name: 'home'
};

start = home;

ends = [
    {
        latitude: 37.418274,
        longitude: -122.204979,
        name: 'work'
    }, {
        latitude: -41.277844,
        longitude: 174.757855,
        name: 'Wellington'
    }, {
        latitude: 19.164188,
        longitude: 72.903681,
        name: 'Mumbai'
    }, {
        latitude: -37.418274,
        longitude: 180 - 122.204979,
        name: 'Far Point'
    }, home
];

test('home distance is 0.', ()=>{
    expect(haversine(home, home)).toBe(0)
})

test('Mumbai distance is 13524.832555988965.', ()=>{
    expect(haversine(home, ends[2])).toBeCloseTo(13524.832555988965, 5)
})

test('Wellington distance is 10843.330123385995.', ()=>{
    expect(haversine(home, ends[1])).toBeCloseTo(10843.330123385995, 5)
})
