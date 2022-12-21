/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Closeicon from "../../assets/Images/Closeicon.svg";
import {
  Button,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  IconButton,
} from "@mui/material";
import _ from "lodash";

import { Alert } from "@mui/material";
import {
  useAddWeightageMutation,
  useGetOtherRecommendationQuery,
  useGetSingleTemplateQuery,
} from "../../service";
import { useParams } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*
By default error should be false so that we don't send requset if fields are empty 
if there is any error we shouldn't send any request 
We also need to check if users has selected any field or not 
if error we need 
*/


const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
const Contain = styled("div")({
  //   // marginLeft: "25px",
  //   // marginRight: "20px",
  //   // marginTop: "10px",
  //   // width: "1000",
  //   // paddingTop: "0px",
});

const OtherRecommendation = (props: any) => {
  const { tab, setTabs, navPrompt, setnavPrompt,settriggerTheNav1 } = props;
  const { id } = useParams();
  // const id = '62b2eaa250b50c443ef9759a'
  const [users, setUsers] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const { data: otherData } = useGetOtherRecommendationQuery("");
  const { data: singleTemplateData, isLoading: load } =
    useGetSingleTemplateQuery(id);
  const [addWeightage, { isError, isSuccess: isSuccessOther }] =
    useAddWeightageMutation();
  const [save1, setSave1] = useState(isSuccessOther);

  const [idAlert, setidAlert] = useState(false);
  useEffect(() => {
    if (id === undefined) {
      setidAlert(true);
      setOpen2(true);
    } else {
      setidAlert(false);
    }
  }, []);

  console.log(error, "alert error");
  useEffect(() => {
    if (singleTemplateData) {
      setTemplateData(() => {
        return singleTemplateData.template.other_recommendation.map(
          (item: any) => {
            return {
              ...item.name,
              isChecked: item.isChecked,
            };
          }
        );
      });
    }
  }, [otherData, singleTemplateData]);

  useEffect(() => {
    console.log("useeffect run");

    if (templateData && otherData) {
      setUsers((prev: any) => {
        const newArr = [...templateData, ...otherData.data];
        const newA = _.uniqBy(newArr, "_id");
        console.log(newA, "new");
        return newA;
      });
    }
  }, [otherData, templateData]);

  console.log(users, "users");

  const handleOnCheck = (e: any) => {
    setnavPrompt(true);
    settriggerTheNav1(true);
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const tempUser = users.map((other: any) => {
        return { ...other, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      const tempUser = users.map((other: any) => {
        return other._id === name ? { ...other, isChecked: checked } : other;
      });
      setUsers(tempUser);
      console.log(tempUser, "temp");
    }
  };

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
          isChecked: i.isChecked,
        };
      });
      return check;
    }
  };

  useEffect(() => {
    //@ts-ignore
    console.log(checkboxIdHandler(checkboxHandler(users)));
  }, [users]);

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };
  const selectOneError = (i: any) => {
    setSave1(false);

    if (i && i.length === 0) {
      setError(true);
      setSave1(false);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    } else if (i && i.length > 0) {
      addOtherRecommendation({
        other_recommendation: checkboxIdHandler(
          checkboxHandler(users)
        ),
      });
      setError(false);
      setSave1(true);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
      // setTabs(tab + 1);
      console.log(error, "save");
      setnavPrompt(false);
      settriggerTheNav1(false);
    } else {
      setSave1(false);
    }
    console.log(i, "setSelectedUser");
  };

  const addOtherRecommendation = (data: any) => {
    console.log(data, "data");
    addWeightage({
      other_recommendation: data.other_recommendation,
      id: id,
    });
  };
  // alert to dialogue
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
    setError(false);
    setSave1(false)
  };
  return (
    <>
      <div style={{ paddingLeft: "20px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="20px"
        >
          <div
            style={{
              fontSize: "18px",
              fontFamily: "Arial",
              color: "#3e8cb5",
            }}
          >
            Other Recommendations
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            {id && (
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                }}
                variant="outlined"
                onClick={() => {
                  selectOneError(checkboxIdHandler(checkboxHandler(users)));
                  //@ts-ignore
                  // if (!error && checkboxIdHandler(checkboxHandler(users))?.length > 0) {
                  console.log("runnging");
                  // addOtherRecommendation({
                  //   other_recommendation: checkboxIdHandler(
                  //     checkboxHandler(users)
                  //   ),
                  // });
                  // }
                  // setTabs(tab + 1);
                }}
              >
                Save as Draft
              </Button>
            )}

          </div>
        </Stack>

        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            onClose={handleClose3}
            BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            style={{
              marginTop: "80px",
              height: "calc(100vh - 50px)",
            }}
            PaperProps={{
              style: {
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin:"0px",
                padding:"30px",
              },
            }}
          >
             {/* <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                id="alert-dialog-title"
              >
                <IconButton  >
                  <img src={Closeicon} alt="icon"
                    onClick={handleClose3} />
                </IconButton>

              </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY:"hidden",
              }}
            >
              {idAlert && (
                <div >
                  Select Objective Type for the template.
                </div>
              )}
              {hideAlert && error && (
                <div >Changes have not been saved. Please select atleast 1 Other Recommendation.</div>
              )}
              {hideAlert && save1 && (
                <div>Changes have been saved.</div>
              )}
            </DialogContentText></DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // paddingBottom: "20px"
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "10px",
                  color:"#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleClose3}
              >
                Ok
              </Button>
            </DialogActions>

          </Dialog>
        </div>
        {/* {idAlert && (
          <Alert severity="error">
            Select Objective Type for the template!
          </Alert>
        )}
        {hideAlert && error && (
          <Alert severity="error">Changes have not been saved. Please select atleast 1 Other Recommendation!</Alert>
        )}
        {hideAlert && save1 && (
          <Alert severity="info">Other Recommendation details added</Alert>
        )} */}
        {!idAlert && (
          <TableContainer>
            <Scroll>
              <Scrollbar style={{ width: "100%", height: "calc(100vh - 350px)" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Description
                      </TableCell>

                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#33333",
                    opacity: "80%",
                    fontFamily: "regular",
                  }}
                  align="left"
                >
                  Select All
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    color: "#33333",
                    opacity: "80%",
                    fontFamily: "regular",
                  }}
                  align="right"
                >
                  <input
                    name="allSelect"
                    checked={users &&
                      users.filter((employee: any) => employee.isChecked !== true)
                        .length < 1}
                    onChange={handleOnCheck}
                    type="checkbox"
                    style={{
                      height: "17px",
                      width: "17px",
                      border: "1px solid #D5D5D5",
                    }} />
                </TableCell>

              </TableRow> */}
                    {users.map((i: any) => {
                      return (
                        <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderColor: "#lightgrey",
                          },
                        }}
                        >
                          <TableCell
                          width="90%"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak:"break-word"
                            }}
                            align="left"
                          >
                            {i.name}
                          </TableCell>
                          <TableCell
                            width="10%"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="center"
                          >
                            <input
                              name={i._id}
                              checked={i?.isChecked || false}
                              onChange={handleOnCheck}
                              type="checkbox"
                              style={{
                                height: "17px",
                                width: "17px",
                                borderColor: "#D5D5D5",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Scroll>

          </TableContainer>
        )}
      </div>
    </>
  );
};

export default OtherRecommendation;