module.exports = function(req, res, next) {
    
    req.getConnection(function(err, connection) {
      if (err) return next(err);
      
      connection.query('SELECT 1 AS RESULT', [], function(err, results) {
        if (err) return next(err);
        
        results[0].RESULT;
        // -> 1
        
        res.send(200);
      });
      
    })}