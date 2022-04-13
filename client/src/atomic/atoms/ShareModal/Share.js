import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  usePDF,
  View,
} from "@react-pdf/renderer";

// Material-ui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@material-ui/core";

// icons
import ShareIcon from "@material-ui/icons/Share";

// custom components
import { getDateTime } from "../../../common/Utility";

// css *required
import { useStyles } from "./Share.css";

// Styles for pdf
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    textAlign: "center",
    margin: 32,
  },
  nameText: {
    marginBottom: 32,
  },
  text: {
    marginBottom: 12,
    flex: 1,
  },
  tableContainer: {
    marginTop: 32,
  },
  table: {
    display: "flex",
    flexDirection: "row",
  },
  border: {
    borderTop: "2px solid #000000",
    paddingTop: 8,
  },
});

//===================================================
// 1.Main Component
//===================================================
const Share = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const { data } = props;
  const { accountList, user, kTotal, sTotal } = data;
  const { tableHeaders } = user;
  const [instance, updateInstance] = usePDF({
    document: (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={[styles.text, styles.nameText]}>
              Name: {user.name}
            </Text>
            <Text style={styles.text}>{getDateTime(Date.now())}</Text>
            <View style={[styles.table, styles.tableContainer]}>
              <Text style={styles.text}>{tableHeaders?.mValue ?? "M"}</Text>
              <Text style={styles.text}>{tableHeaders?.kValue ?? "K"}</Text>
              <Text style={styles.text}>{tableHeaders?.sValue ?? "S"}</Text>
            </View>
            {accountList.map((item, i) => {
              return (
                <View key={i} style={styles.table}>
                  <Text style={styles.text}>{item.mValue}</Text>
                  <Text style={styles.text}>{item.kValue} </Text>
                  <Text style={styles.text}>{item.sValue}</Text>
                </View>
              );
            })}
            <View style={[styles.table, styles.border]}>
              <Text style={styles.text}>Total:</Text>
              <Text style={styles.text}>{kTotal} </Text>
              <Text style={styles.text}>{sTotal}</Text>
            </View>
          </View>
        </Page>
      </Document>
    ),
  });

  // showMain
  return showMain({
    classes,
    ...props,
    instance,
    updateInstance,
  });
};

//===================================================
// 2.Export
//===================================================
export default Share;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
Share.propTypes = {};

//3-2. defaultProps
Share.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, open, onCloseShareModal, data } = props;
  const { kTotal, sTotal, user, accountList } = data;
  const { tableHeaders } = user;
  return (
    <Dialog
      open={open}
      onClose={onCloseShareModal && onCloseShareModal}
      aria-labelledby="share-dialog"
      maxWidth="sm"
      fullWidth
      className={classes.dialogBox}
    >
      <DialogTitle className={classes.dialogTitle}>
        {<ShareIcon className={classes.shareIcon} />}Share
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText className={classes.section}>
          Name: {user.name}
        </DialogContentText>
        <DialogContentText className={classes.section}>
          {getDateTime(Date.now())}
        </DialogContentText>
        <Typography
          component="div"
          className={classes.table + " " + classes.tableContainer}
        >
          <DialogContentText className={classes.text}>
            {tableHeaders?.mValue ?? "M"}
          </DialogContentText>
          <DialogContentText className={classes.text}>
            {tableHeaders?.kValue ?? "K"}
          </DialogContentText>
          <DialogContentText className={classes.text}>
            {tableHeaders?.sValue ?? "S"}
          </DialogContentText>
        </Typography>
        {accountList.map((item, i) => {
          return (
            <Typography component="div" key={i} className={classes.table}>
              <DialogContentText className={classes.text}>
                {item.mValue}
              </DialogContentText>
              <DialogContentText className={classes.text}>
                {item.kValue}
              </DialogContentText>
              <DialogContentText className={classes.text}>
                {item.sValue}
              </DialogContentText>
            </Typography>
          );
        })}
        <Typography
          component="div"
          className={classes.table + " " + classes.border}
        >
          <DialogContentText className={classes.text}>Total:</DialogContentText>
          <DialogContentText className={classes.text}>
            {kTotal}
          </DialogContentText>
          <DialogContentText className={classes.text}>
            {sTotal}
          </DialogContentText>
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={() => handleDownloadPdf(props)}
          variant="contained"
          className={classes.shareButton}
        >
          Generate Pdf
        </Button>
      </DialogActions>
    </Dialog>
  );
};

//===================================================
// 5.Actions
//===================================================
/**
 * Download Pdf
 * @param {*} props
 */
const handleDownloadPdf = (props) => {
  const {
    instance,
    handleCreatePdf,
    data: { user },
  } = props;
  if (instance.error) {
    alert("Something went wrong!", instance.error);
  } else {
    const ele = document.createElement("a");
    ele.href = instance.url;
    ele.download =
      user.name + "_" + getDateTime(Date.now()).split(",")[0] + ".pdf";
    ele.click();
    handleCreatePdf();
  }
};
