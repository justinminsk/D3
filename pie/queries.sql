SELECT MAX(t.name) AS name, t.yearID, SUM(s.salary) AS salary,
MAX(CASE
	WHEN name = 'New York Yankees' then 'black' 
	WHEN name = 'Boston Red Sox' then 'red'
	WHEN name = 'Toronto Blue Jays' then 'blue'
	WHEN name = 'Baltimore Orioles' then 'orange'
	ELSE 'teal' 
END) AS color
FROM Teams AS t INNER JOIN Salaries AS s
ON t.teamID = s.teamID
WHERE t.yearID >= 1998 AND t.yearID < 2016 AND t.lgID = 'AL' AND t.divID = 'E' AND t.yearID = s.yearID
GROUP BY t.yearID, t.teamID;
