import {
	Card,
	CardActionArea,
	CardContent,
	Divider,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import routes from "../routes.json";
import Link from "./Link";
import { frontMatter } from "../pages/**/*.md";

const useStyles = makeStyles((theme) => ({
	grid: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1),
	},
	heading: {
		margin: theme.spacing(3, 0),
		whiteSpace: "pre-wrap !important",
		overflowWrap: "anywhere",
		wordBreak: "break-word",
	},
	card: {
		whiteSpace: "pre-wrap !important",
		overflowWrap: "anywhere",
		wordBreak: "break-word",
		height: "100%",
	},
	cardActionArea: {
		height: "100%",
	},
}));

export default function Other() {
	const classes = useStyles();

	const router = useRouter();

	function routesArray(routes, dirName) {
		const array = [];
		Object.keys(routes).forEach((route) => {
			if (route === "__dirroute__") return;
			if (typeof routes[route] === "string")
				array.push([route, routes[route], dirName]);
			else array.push(...routesArray(routes[route], route));
		});
		return array;
	}

	const rArray = routesArray(routes);

	const currentRoutes = rArray.filter((route) =>
		route[1].startsWith(router.pathname)
	);

	const category = currentRoutes[0][2];

	const cards = currentRoutes.map((route) => {
		const fm = frontMatter.find((f) =>
			f ? f.name === route[1].slice(1) : false
		);

		return (
			<Grid item xs={12} sm={6} key={route}>
				<Card className={classes.card}>
					<CardActionArea
						component={Link}
						naked
						href={route[1]}
						className={classes.cardActionArea}
					>
						<CardContent>
							<Typography variant="h5">{route[0]}</Typography>
							<Typography color="textSecondary">
								{fm.description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	});

	return (
		<>
			<Typography variant="h4" component="h1" className={classes.heading}>
				{category}
			</Typography>
			<Divider />
			<Grid container spacing={2} className={classes.grid}>
				{cards}
			</Grid>
		</>
	);
}
