const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 8000;
app.listen(port, () => {
  console.log('listening... from port ${port}');
});
