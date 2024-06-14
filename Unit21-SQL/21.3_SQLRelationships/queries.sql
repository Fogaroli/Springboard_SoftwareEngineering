-- write your queries here
-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id . 
SELECT * FROM owners o LEFT JOIN vehicles v ON v.owner_id = o.id;

-- Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order.
SELECT o.first_name, o.last_name, count(*) as total_cars from owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY o.id ORDER BY first_name;

-- Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000
SELECT o.first_name, o.last_name, ROUND(AVG(v.price)) AS Average_price, count(*) AS total_cars FROM owners o 
JOIN vehicles v ON o.id = v.owner_id GROUP BY o.id HAVING count(*) > 1 AND AVG(v.price) > 10000 ORDER BY first_name DESC;