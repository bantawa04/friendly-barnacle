import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
    height: "74vh",
    marginTop: "8vh",
  },
  table: {
    backgroundColor: theme.palette.background.paper,
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
  styledMemo: {
    maxWidth: "200px",
    textAlign: "justify",
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
  innerTableBodyCell: {
    verticalAlign: "top",
  },
}));
