import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "96%",
    flexDirection: "column",
    padding: "24px",
    backgroundColor: "#F2F5F8",
  },
  shareButtonRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    marginBottom: 40,
    marginTop: 50,
  },
  shareButton: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3f51b5",
    color: theme.palette.background.paper,
    textTransform: "none",
    height: 40,
    fontSize: 16,
    fontFamily: `'Roboto', sans-serif`,
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  tableContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: "74vh",
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
  innerTable: {
    margin: "-16px !important",
  },
  innerTableBodyCell: {
    verticalAlign: "top",
  },
  emptyTableList: {},
}));
