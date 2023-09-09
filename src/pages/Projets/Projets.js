import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { DoubleArrow, Search as SearchIcon } from "@material-ui/icons";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

const projectData = {
  projects: [
    {
      name: "Project A",
      code: "P12345",
    },
    {
      name: "Project B",
      code: "P23456",
    },
    {
      name: "Project C",
      code: "P34567",
    },
    {
      name: "Project D",
      code: "P45678",
    },
    {
      name: "Project E",
      code: "P56789",
    },
  ],
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
  addButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: "#3A85F4",
    color: "white",
  },
  searchInput: {
    width: "100%",
    borderRadius: 25, // Rounded border
  },
}));

export default function Projets() {
  const classes = useStyles();
  const [numColumns, setNumColumns] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(
    projectData.projects
  );

  useEffect(() => {
    const updateNumColumns = () => {
      const container = document.querySelector(".container");
      if (container) {
        const containerWidth = container.offsetWidth;
        const cardWidth = 340;
        const minSpace = 2;
        const columns = Math.floor(
          (containerWidth - minSpace) / (cardWidth + minSpace)
        );
        setNumColumns(columns > 0 ? columns : 1);
      }
    };

    window.addEventListener("resize", updateNumColumns);
    updateNumColumns();

    return () => {
      window.removeEventListener("resize", updateNumColumns);
    };
  }, []);

  useEffect(() => {
    const filtered = projectData.projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <PageTitle title="Projets" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            className={classes.searchInput}
            variant="outlined"
            placeholder="Rechercher par code ou titre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Button
            variant="contained"
            className={classes.addButton}
            component={RouterLink}
            to="/app/add-project"
          >
            Ajouter
          </Button>
        </Grid>
        {filteredProjects.map((project, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={Math.floor(12 / numColumns)}
            key={index}
          >
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div>
                  <Typography variant="body1">{project.name}</Typography>
                  <Typography variant="body1">{project.code}</Typography>

                  <RouterLink
                    to={`/app/project/${project.code}`}
                    className={classes.link}
                  >
                    <DoubleArrow />
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
