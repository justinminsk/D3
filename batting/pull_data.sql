SELECT max(nameLast) AS nameLast, sum(HR) AS HR, sum(BB) AS BB, sum(SO) AS SO
FROM Batting INNER JOIN Master
ON Batting.playerID = Master.playerID
GROUP BY Batting.playerID
HAVING HR >= 500;