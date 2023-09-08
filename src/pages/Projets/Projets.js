import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { DoubleArrow } from "@material-ui/icons";
const projectData = {
  "projects": [
    {
      "name": "Project A",
      "code": "P12345"
    },
    {
      "name": "Project B",
      "code": "P23456"
    },
    {
      "name": "Project C",
      "code": "P34567"
    },
    {
      "name": "Project D",
      "code": "P45678"
    },
    {
      "name": "Project E",
      "code": "P56789"
    }
  ]
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: "#3A85F4",
    color: "white",
    borderRadius: 10,
    marginBottom: theme.spacing(2),
    marginInlineStart: 4,
    marginInline: 4,
  },
  cardContent: {
    fontSize: 16,
  },
}));

export default function Projets() {
  const classes = useStyles();
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const calculateColumns = () => {
      const containerWidth = document.querySelector(".container").offsetWidth;
      const cardWidth = 340; // Updated width of each card to 340px
      const minSpace = 2;
      const columns = Math.floor(
        (containerWidth - minSpace) / (cardWidth + minSpace)
      );
      return columns > 0 ? columns : 1;
    };

    const updateNumColumns = () => {
      const columns = calculateColumns();
      setNumColumns(columns);
    };

    window.addEventListener("resize", updateNumColumns);
    updateNumColumns();

    return () => {
      window.removeEventListener("resize", updateNumColumns);
    };
  }, []);

  return (
    <>
      <PageTitle title="Projets" />

      <Grid container spacing={2} className="container">
        {projectData.projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} lg={Math.floor(12 / numColumns)} key={index}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
               <div>
                <Typography variant="body1" >
                  {project.name}
                </Typography>
                <Typography variant="body1">
                  {project.code}
                </Typography>

                <RouterLink to={`/app/project/${project.code}`} className={classes.link}>
                  <DoubleArrow/>
                  </RouterLink>

                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
