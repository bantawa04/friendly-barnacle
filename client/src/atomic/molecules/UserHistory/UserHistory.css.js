import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "96%",
  },
  root: {
    display: "flex",
    height: "96%",
    flexDirection: "column",
    padding: "24px",
    backgroundColor: "#F2F5F8",
  },
  tableContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: "100vh",
    marginTop: "8vh",
  },
  table: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: 32,
  },
  tableHeadCell: {
    border: "none",
    fontWeight: "bold",
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 14,
  },
  tableBodyCell: {
    border: "none",
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 12,
  },
  innerTableBodyCell: {
    verticalAlign: "top",
  },
}));
