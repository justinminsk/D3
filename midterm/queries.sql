SELECT s.yearID, sum(salary) AS salary, MAX(name) as name
FROM Salaries AS s
JOIN Teams AS t
ON s.teamID = t.teamID
GROUP BY t.name, s.yearID;
