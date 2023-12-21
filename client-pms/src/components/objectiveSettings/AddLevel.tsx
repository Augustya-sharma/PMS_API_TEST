/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Container, TextField, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  useCreateObjectiveDescriptionMutation,
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useGetSingleObjectiveDescriptionQuery,
  useUpdateObjectiveDescriptionMutation,
} from "../../service";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import {
  ADD_LEVEL,
  LINK_CALENDAR,
  LINK_CALENDAR_OPEN,
  OBJECTIVE,
  VIEW_OBJECTIVE_DESCRIPTION,
  VIEW_OBJECTIVE_DESCRIPTION_1,
} from "../../constants/routes/Routing";
import PAMaster from "../UI/PAMaster";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import AlertDialogSuccess from "../UI/DialogSuccess";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  MASTER_NAV,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { AlertDialog } from "..";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Plus from "../../assets/Images/Plus.svg";

import Edit from "../../assets/Images/Edit.svg";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Scrollbar } from "react-scrollbars-custom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//prompt -------functions

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Icon = styled("div")({
  "& .MuiIconButton-root": {
    padding: "0px !important",
  },
});

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

function createData(
  number: number,
  objectivedescription: any,
  detaileddescription: any,
  criteria: any,
  linktobojectivetype: any,
  action: any
) {
  return {
    number,
    objectivedescription,
    detaileddescription,
    criteria,
    linktobojectivetype,
    action,
  };
}

const rows = [
  createData(
    1,
    "Knowledge of the job",
    "The extent to which the employee applies the knowledge and skills involved in the current job (please use the JD as a reference)",
    "Rating",
    "Job competencies",
    <Button
      style={{
        borderRadius: "4px",
        textTransform: "none",
        fontSize: "15px",
        fontFamily: "sans-serif",
        padding: "2px 9px",

        borderColor: "#004C75",
        color: "#004C75",
      }}
      variant="outlined"
    >
      Add
    </Button>
  ),
];
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}}/>}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // width: "90%",
  border: "1px solid lightgrey",
}));

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AddLevel(props: any) {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const { id } = useParams();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const {
    onSubmit,

    errorObjectiveDescription1,
    errorObjectiveDescription2,
    data1,
  } = props;

  const [objectiveType, setObjectiveType] = React.useState("");
  console.log(objectiveType, "objectiveTypeobjectiveType");
  const [criteria, setCriteria] = React.useState("Rating");
  const [description, setDescription] = React.useState("");
  const [detailedDescription, setDetailedDescription] = React.useState("");

  const [activeLevel, setActiveLevel] = React.useState(0);

  const [textfeildError, settextfeildError] = useState(false);
  const [hideLevel, setHideLevel] = useState(false);
  const [checked, setChecked] = useState(false);

  const [level_1, setLevel_1] = useState<any>([{ behavioral_objective: "" }]);
  const [level_3, setLevel_3] = useState<any>([{ behavioral_objective: "" }]);
  const [level_2, setLevel_2] = useState<any>([{ behavioral_objective: "" }]);
  const [level_4, setLevel_4] = useState<any>([{ behavioral_objective: "" }]);

  const [level_1_definition, setLevel_1_definition] = useState<any>("");
  const [level_2_definition, setLevel_2_definition] = useState<any>("");
  const [level_3_definition, setLevel_3_definition] = useState<any>("");
  const [level_4_definition, setLevel_4_definition] = useState<any>("");

  console.log(level_1, level_1_definition, "level_1");

  const { data: objectiveTypeData } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const [createObjectiveDescription] = useCreateObjectiveDescriptionMutation();
  const { data: defaultValue } = useGetSingleObjectiveDescriptionQuery(id);
  const [updateObjectiveDescription] = useUpdateObjectiveDescriptionMutation();

  const { data: objectiveDescriptionData } =
    useGetObjectiveDescriptionQuery("");
  console.log(defaultValue, "defaultValue");
  console.log(objectiveDescriptionData?.data[0], "objectiveDescriptionDatassss");
  console.log(objectiveDescriptionData?.data[0]?.objectiveTitle, "objectivetit");
  const [objectiveTitle, setObjectiveTitle] = React.useState("");
  useEffect(() => {
    setObjectiveTitle(objectiveDescriptionData?.data[0]?._id);
  }, [objectiveDescriptionData]);
  console.log(objectiveTitle, "hhhh");
  const errorHandler = () => {
    if (description !== "" && objectiveType !== "") {
      return settextfeildError(false), submitHandler();
    } else {
      return settextfeildError(true);
    }
  };
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   useEffect(() => {

  //   //  errorHandler ( () => {
  //   //   if (description !== "" && detailedDescription !== "") {
  //   //     return settextfeildError(false), submitHandler();
  //   //   } else {
  //   //     return settextfeildError(true);

  //   //   }

  //   // });

  //   errorHandler()
  // }, [description,detailedDescription, objectiveType]);
  const getBehavioralObjectiveFromLevel = (level: any) => {
    return level.map((item: any) => item.behavioral_objective.trim()).filter((item: any)=>item!="");
  };

  const tabValue = ["Level1", "Level2", "Level3", "Level4"];
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveLevel(newValue);
  };

  const handleLevelAdd1 = () => {
    setLevel_1([...level_1, { behavioral_objective: "" }]);
  };

  const handleLevelRemove1 = (index: any) => {
    const newleLevel1 = [...level_1];
    console.log(index, "index");
    newleLevel1.splice(index, 1);
    setLevel_1(newleLevel1);
  };

  const handleChangeLevel1 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel1 = [...level_1];
    // @ts-ignore
    newleLevel1[index].behavioral_objective = value;
    setLevel_1(newleLevel1);
  };

  const handleLevelAdd2 = () => {
    setLevel_2([...level_2, { behavioral_objective: "" }]);
  };

  const handleLevelRemove2 = (index: any) => {
    const newleLevel2 = [...level_2];
    console.log(index, "index");
    newleLevel2.splice(index, 1);
    setLevel_2(newleLevel2);
  };

  const handleChangeLevel2 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel2 = [...level_2];
    // @ts-ignore
    newleLevel2[index].behavioral_objective = value;
    setLevel_2(newleLevel2);
  };

  const handleLevelAdd3 = () => {
    setLevel_3([...level_3, { behavioral_objective: "" }]);
  };

  const handleLevelRemove3 = (index: any) => {
    const newleLevel3 = [...level_3];
    console.log(index, "index");
    newleLevel3.splice(index, 1);
    setLevel_3(newleLevel3);
  };

  const handleChangeLevel3 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel3 = [...level_3];
    // @ts-ignore
    newleLevel3[index].behavioral_objective = value;
    setLevel_3(newleLevel3);
  };

  const handleLevelAdd4 = () => {
    setLevel_4([...level_4, { behavioral_objective: "" }]);
  };

  const handleLevelRemove4 = (index: any) => {
    const newleLevel4 = [...level_4];
    console.log(index, "index");
    newleLevel4.splice(index, 1);
    setLevel_4(newleLevel4);
  };

  const handleChangeLevel4 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel4 = [...level_4];
    // @ts-ignore
    newleLevel4[index].behavioral_objective = value;
    setLevel_4(newleLevel4);
  };
  //validation-starts
  const [textfeildError3, settextfeildError3] = useState(false);
  const [textfeildErrorLevel1, settextfeildErrorLevel1] = useState(false);
  const [behavioralobjLevel1, setbehavioralobjLevel1] = useState(false);
  const [levelUniqueness, setlevelUniqueness] = useState(false);
  const [objBehavioralUniqueness, setobjBehavioralUniqueness] = useState(false);
  const [dataRequired, setdataRequired] = useState(false);
  console.log(textfeildError3, "textfeildError3");
  const levelobjectiveTitleHandler = () => {
    if (objectiveTitle !== "") {
      console.log("func1");
      return setnavPrompt(false), setnavTrigger(true);
    } else {
      return settextfeildError3(true), setnavTrigger(false);
      // settextfeildErrorLevel1(true),
      // setbehavioralobjLevel1(true)
    }
  };
  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  console.log(navTrigger, navPrompt, "navTrigger&prompt");
  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      console.log("func2");
      levelsSubmitHandler();
    }
  }, [navTrigger]);
  //nav prompt
  //ref
  const scrollEnd = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView();
  }, [levelobjectiveTitleHandler]);
  //ref
  const cancelfun = () => {
    settextfeildError3(false),
      settextfeildErrorLevel1(false),
      setbehavioralobjLevel1(false),
      setObjectiveTitle("");
  };
  const levelsSubmitHandler = () => {
    console.log("func3");
    if (
      (level_1_definition !== "" && level_1[0].behavioral_objective !== "") ||
      (level_2_definition !== "" && level_2[0].behavioral_objective !== "") ||
      (level_3_definition !== "" && level_3[0].behavioral_objective !== "") ||
      (level_4_definition !== "" && level_4[0].behavioral_objective !== "")
    ) {
      console.log(" data available");
      levelsuniqueHandler();
    } else {
      console.log("minimum one level data should be available");
      setdataRequired(true);
      setOpen2(true);
      setnavTrigger(false);
      // setTimeout(() => {
      //   setdataRequired(false);
      // }, 3000);
    }
  };
  const [successfullyChanged, setsuccessfullyChanged] = useState(false);
  const handleClicksuccessClose = () => {
    setsuccessfullyChanged(false);
    navigate(-1);
    //navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`)
};
  const levelsuniqueHandler = () => {
    console.log("func4");
    if (
      (level_1_definition === level_2_definition &&
        level_2_definition !== "") ||
      (level_1_definition === level_3_definition &&
        level_3_definition !== "") ||
      (level_1_definition === level_4_definition &&
        level_4_definition !== "") ||
      (level_2_definition === level_3_definition &&
        level_3_definition !== "") ||
      (level_2_definition === level_4_definition &&
        level_4_definition !== "") ||
      (level_3_definition === level_4_definition && level_4_definition !== "")
    ) {
      setlevelUniqueness(true);
      setOpen2(true);
      setnavTrigger(false);
      // setTimeout(() => {
      //   setlevelUniqueness(false);
      // }, 3000);
    } else if (
      (level_1[0].behavioral_objective === level_2[0].behavioral_objective &&
        level_2[0].behavioral_objective !== "") ||
      (level_1[0].behavioral_objective === level_3[0].behavioral_objective &&
        level_3[0].behavioral_objective !== "") ||
      (level_1[0].behavioral_objective === level_4[0].behavioral_objective &&
        level_4[0].behavioral_objective !== "") ||
      (level_2[0].behavioral_objective === level_3[0].behavioral_objective &&
        level_3[0].behavioral_objective !== "") ||
      (level_2[0].behavioral_objective === level_4[0].behavioral_objective &&
        level_4[0].behavioral_objective !== "") ||
      (level_3[0].behavioral_objective === level_4[0].behavioral_objective &&
        level_4[0].behavioral_objective !== "")
    ) {
      setobjBehavioralUniqueness(true);
      setOpen2(true);
      setnavTrigger(false);
      // setTimeout(() => {
      //   setobjBehavioralUniqueness(false);
      // }, 3000);
    } else {
      //navigate(-1),
        updateObjectiveDescription({
          objective_title: objectiveTitle,
          level_1: {
            level_definition: level_1_definition.trim(),
            behavioral_objective: getBehavioralObjectiveFromLevel(level_1),
          },
          level_2: {
            level_definition: level_2_definition.trim(),
            behavioral_objective: getBehavioralObjectiveFromLevel(level_2),
          },
          level_3: {
            level_definition: level_3_definition.trim(),
            behavioral_objective: getBehavioralObjectiveFromLevel(level_3),
          },
          level_4: {
            level_definition: level_4_definition.trim(),
            behavioral_objective: getBehavioralObjectiveFromLevel(level_4),
          },
          id: objectiveTitle,
        }).then((res: any) => {
          res.error ? <> </> : 
          setsuccessfullyChanged(true)
          //setOpen(true)  
          //navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`);
      }),
        setObjectiveTitle("");
      setnavTrigger(false);
    }
  };

  // const compare =(a,b) => {
  //   if ((a ! == "") ||  (b!== "") ){
  //  if (a === b) {
  //   alert('levels values should not be the same')
  //  } else {
  //   alert('success')
  //  }
  //   }
  // }

  // compare(level_1_definition,level_2_definition)
  // return

  //validation-ends
  const [objectiveTitleValue, setobjectiveTitleValue] = React.useState<any>('');
  console.log(objectiveTitleValue, 'objectiveTitleValue')
  useEffect(() => {
    setobjectiveTitleValue(objectiveDescriptionData?.data[0]?.objectiveTitle)
  }, [objectiveDescriptionData])

  useEffect(() => {
    if (defaultValue) {
      setDescription(defaultValue.data.description);
      setCriteria(defaultValue.data.criteria);
      setDetailedDescription(defaultValue.data.detailed_description);
      setObjectiveType(defaultValue.data.objective_type._id);
      // setObjectiveTitle(defaultValue.data.objective_title._id)
      //setobjectiveTitleValue(objectiveDescriptionData?.data[0]?.objectiveTitle);
      setLevel_1_definition(defaultValue.data.level_1.level_definition);
      setLevel_2_definition(defaultValue.data.level_2.level_definition);
      setLevel_3_definition(defaultValue.data.level_3.level_definition);
      setLevel_4_definition(defaultValue.data.level_4.level_definition);
      setLevel_1(() =>
        defaultValue.data.level_1.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );
      setLevel_2(() =>
        defaultValue.data.level_2.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );

      setLevel_3(() =>
        defaultValue.data.level_3.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );

      setLevel_4(() =>
        defaultValue.data.level_4.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );
    }
  }, [defaultValue]);
  console.log(description);

  let navigate = useNavigate();

  // const [createObjectiveDescription, {isSuccess, isError}] =
  //     useCreateObjectiveDescriptionMutation();

  const submitHandler = () => {
    // if (isError === false) {

    //   navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`);
    // }

    onSubmit(objectiveType, criteria, description, detailedDescription);
    setDescription("");
    setDetailedDescription("");
    setObjectiveType("");
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClose3 = () => {
    setOpen2(false);
    setdataRequired(false);
    setlevelUniqueness(false);
    setobjBehavioralUniqueness(false);

  };
  const ObjectiveTypeDropDown = () => {
    const handleSelectChange = (event: SelectChangeEvent) => {
      setObjectiveType(event.target.value as string);
    };

    return (
      <>
        {/* <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            style={{ marginTop: "-7px", fontSize: "14px" }}
            variant="outlined"
          >
            Select
          </InputLabel>

          <Select
            label="Select"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={objectiveType}
            onChange={handleSelectChange}
            style={{ height: "40px" }}
          >
            {data &&
              data.data.map((objectiveType: any) => {
                return [
                  <MenuItem
                    style={{ fontSize: "14px" }}
                    value={objectiveType._id}
                  >
                    {objectiveType.name}
                  </MenuItem>,
                ];
              })}
          </Select>
        </FormControl> */}
        <FormControl sx={{ m: 1, width: 200 }}>
          <Select
            // select
            label={objectiveType === "" ? "Select" : ""}
            id="outlined-select-select"
            variant="outlined"
            size="small"
            style={{ marginTop: "25px" }}
            value={objectiveType}
            error={!objectiveType && textfeildError}
            // helperText={
            //     !objectiveType && textfeildError
            //         ? "*Objective type required."
            //         : " "
            // }
            // onChange={handleSelectChange}
            onChange={(e: { target: { value: any } }) => {
              setObjectiveType(e.target.value);
              setnavPrompt(true);
            }}
          >
            {objectiveTypeData &&
              objectiveTypeData.data.map((objectiveType: any) => {
                console.log(objectiveType, "select");
                return [
                  <MenuItem
                    style={{ fontSize: "14px" }}
                    value={objectiveType._id}
                  >
                    {objectiveType.name}
                  </MenuItem>,
                ];
              })}
          </Select>
        </FormControl>
      </>
    );
  };

  const handleLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setHideLevel(!hideLevel);
  };

  const Criteria = () => {
    const handleSelectChange = (event: SelectChangeEvent) => {
      setCriteria(event.target.value as string);
    };

    return (
      <>
        <Switch checked={checked} onChange={handleLevel} />
      </>
    );
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
        fontSize: "14px !important",
        fontFamily: "arial",
        color: "#333333",
      },
    },
  };
  console.log(data1);
  return (
    <>
      {/* <PAMaster name={"Performance Appraisal"} /> */}

      {/* <Typography
        style={{

          color: "#004C75",
          fontSize: "24px",
          // position:"absolute",
          // bottom:"507px",
          // left:"320px"
          paddingLeft: "24px",
          fontFamily: "regular",
        }}
        component="div"
        sx={{ flexGrow: 1 }}
      >
        <span style={{ marginRight: "8px" }}>
          <IconButton>
            <Link to={OBJECTIVE}>
              <img src={Leftarrow} alt="button" />
            </Link>
          </IconButton>
        </span>

        <label>Objective Description</label>
      </Typography> */}

      <PAMaster 
      name={"Add Level"} 
      nav={`${OBJECTIVE}`} 
      secondName={"Objectives Setting"}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          padding: "10px",
        }}
      >
        {errorObjectiveDescription1 && (
          <Alert severity="error">
            Either text field must be empty or entered Objective Description
            already exists!
          </Alert>
        )}
        {errorObjectiveDescription2 && (
          <Alert severity="error">
            Either text field must be empty or entered Objective Description
            already exists!
          </Alert>
        )}

        {/* <Scrollbar style={{ width: "100%", height: "calc(100vh - 206px)" }}> */}
        <Typography style={{ width: "100%" }}>
          <Typography
            style={{
              color: "#3e8cb5",
              fontFamily: "Arial",
              paddingBottom: "10px",
              fontSize: "18px",
            }}
          >
            Objective Title
          </Typography>
          <div
            style={{
              fontSize: "14px",
              textTransform: "none",
              fontFamily: "Arial",
              color: "#333333",
              wordBreak: "break-word",
            }}
          >
            {objectiveTitleValue}
          </div>
          {/* <FormControl sx={{ width: "45%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Text
            </InputLabel>
            <Select
              sx={{
                "& .MuiInputBase-input": {
                  // color: "rgb(62 140 181 / 28%)",
                  fontSize: "14px",
                  textTransform: "none",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
             
              label="Select text"
              id="outlined-basic"
              variant="outlined"
             
              MenuProps={MenuProps}
              
              value={objectiveTitle}
            
              size="small"
              onChange={(e) => {
                setObjectiveTitle(e.target.value);
                setnavPrompt(true);
              }}
              error={!objectiveTitle && textfeildError3}
             
              onKeyPress={(event: any) => {
                var key = event.keyCode || event.which;
                if (key === 13) {
                  levelobjectiveTitleHandler();
                  console.log("Enter Button has been clicked");
                }
              }}
             
            >
              {objectiveDescriptionData &&
                objectiveDescriptionData.data.map((objective_title: any) => {
                  if (objective_title.isTitleChecked === true) {
                    console.log(objectiveDescriptionData.data[0]._id, "hhhhh");
                    return [
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingLeft: "15px",
                        }}
                        value={objective_title._id}
                       
                      >
                        {objective_title.objectiveTitle}
                      </MenuItem>,
                    ];
                  }
                })}
            </Select>
          </FormControl> */}
          {/* <TableContainer>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{bgcolor: "#ebf2f4"}}> */}
          {/* <TableCell
                          sx={{
                            fontFamily: "regular",
                            border: 1,
                            borderColor: "lightgrey",
                            color: "#004C75",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          #
                        </TableCell> */}
          {/*<TableCell*/}
          {/*  align="left"*/}
          {/*  sx={{*/}
          {/*    fontFamily: "regular",*/}
          {/*    border: 1,*/}
          {/*    borderColor: "lightgrey",*/}
          {/*    color: "#004C75",*/}
          {/*    fontSize: "12px",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Objective Type*/}
          {/*</TableCell>*/}
          {/* <TableCell
                          align="left"
                          sx={{
                            fontFamily: "regular",
                            border: 1,
                            borderColor: "lightgrey",
                            color: "#004C75",
                            fontSize: "12px",
                          }}
                        >
                          Objective Title
                        </TableCell> */}
          {/*<TableCell*/}
          {/*  align="left"*/}
          {/*  sx={{*/}
          {/*    fontFamily: "regular",*/}
          {/*    border: 1,*/}
          {/*    borderColor: "lightgrey",*/}
          {/*    color: "#004C75",*/}
          {/*    fontSize: "12px",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Add Levels*/}
          {/*</TableCell>*/}
          {/* <TableCell
                    align="left"
                    sx={{
                      fontFamily: "regular",
                      border: 1,
                      borderColor: "lightgrey",
                      color: "#004C75",
                      fontSize: "12px",
                    }}
                  >
                    Link to objective type
                  </TableCell>*/}
          {/* <TableCell
                          align="center"
                          sx={{
                            fontFamily: "regular",
                            border: 1,
                            borderColor: "lightgrey",
                            color: "#004C75",
                            fontSize: "12px",
                          }}
                        >
                          Action
                        </TableCell> */}
          {/* </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.number}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 1,
                              borderColor: "lightgrey",
                            },
                          }}
                        > */}
          {/* <TableCell
                            component="th"
                            scope="row"
                            width="3%"
                            sx={{
                              border: 1,
                              borderColor: "lightgrey",
                              fontFamily: "regular",
                              color: "#33333",
                              opacity: "80%",
                              textAlign: "center",
                            }}
                          >
                            {row.number}{" "}
                          </TableCell> */}
          {/*<TableCell*/}
          {/*  align="left"*/}
          {/*  width="38%"*/}
          {/*  sx={{*/}
          {/*    border: 1,*/}
          {/*    padding: 2,*/}
          {/*    borderColor: "lightgrey",*/}
          {/*    fontFamily: "regular",*/}
          {/*    color: "#33333",*/}
          {/*    opacity: "80%",*/}
          {/*    fontSize: "14px",*/}
          {/*  }}*/}
          {/*>*/}
          {/*<TextField*/}
          {/*  select*/}
          {/*  placeholder="Enter text"*/}
          {/*  id="outlined-basic"*/}
          {/*  variant="outlined"*/}
          {/*  fullWidth*/}
          {/*  // sx={{ marginTop: "25px" }}*/}
          {/*  value={objectiveType}*/}
          {/*  size="small"*/}
          {/*  onChange={(e) => setObjectiveType(e.target.value)}*/}
          {/*// error={!description && textfeildError}*/}
          {/*// helperText={*/}
          {/*//   !description && textfeildError*/}
          {/*//     ? "*Description required."*/}
          {/*//     : " "*/}
          {/*// }*/}
          {/*>*/}
          {/*  {objectiveTypeData &&*/}
          {/*    objectiveTypeData.data.map(*/}
          {/*      (objectiveType: any) => {*/}
          {/*        return [*/}
          {/*          <MenuItem*/}
          {/*            style={{ fontSize: "14px" }}*/}
          {/*            value={objectiveType._id}*/}
          {/*          >*/}
          {/*            {objectiveType.name}*/}
          {/*          </MenuItem>,*/}
          {/*        ];*/}
          {/*      }*/}
          {/*    )}*/}
          {/*</TextField>*/}
          {/*</TableCell>*/}
          {/* <TableCell
                            align="left"
                            width="38%"
                            sx={{
                              border: 1,
                              padding: 1,
                              borderColor: "lightgrey",
                              fontFamily: "regular",
                              color: "#33333",
                              opacity: "80%",
                              fontSize: "14px",
                            }}
                          > */}
          {/* <TextField
                              select
                              label="Enter text"
                              id="outlined-basic"
                              sx={{ width: "50%" }}
                              variant="outlined"
                              fullWidth
                              // sx={{ marginTop: "25px" }}
                              value={objectiveTitle}
                              size="small"
                              onChange={(e) =>
                                setObjectiveTitle(e.target.value)
                              }
                              error={!objectiveTitle && textfeildError3}
                              helperText={
                                !objectiveTitle && textfeildError3
                                  ? "*Objective title required."
                                  : " "
                              }
                            // error={!description && textfeildError}
                            // helperText={
                            //   !description && textfeildError
                            //     ? "*Description required."
                            //     : " "
                            // }
                            >
                              {objectiveDescriptionData &&
                                objectiveDescriptionData.data.map(
                                  (objective_title: any) => {
                                    return [
                                      <MenuItem
                                        style={{ fontSize: "14px" }}
                                        value={objective_title._id}
                                      >
                                        {objective_title.objectiveTitle}
                                      </MenuItem>,
                                    ];
                                  }
                                )}
                            </TextField> */}
          {/* </TableCell>



                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
        </Typography>
        <div style={{ paddingTop: "20px" }}>
          {/* <Accordion
                            // expanded={expanded === "panel1"}
                            // onChange={handleChange("panel1")}
                            // sx={{ marginTop: 3 }}
                        > */}

          <AccordionDetails>
            <Grid>
              <Grid container>
                <Grid
                  style={{
                    borderRight: "1px solid lightgrey",
                    paddingTop: "20px",
                  }}
                  item
                  xs={2}
                >
                  <Tabs
                    sx={{
                      width: "90%",
                      "&.Mui-selected": {
                        color: "#3e8cb5",
                        backgroundColor: "#ffffff",
                        fontFamily: "Arial",
                        borderRadius: "4px",
                        "& .MuiTabs-indicator": {
                          display: "none",
                        },
                      },
                    }}
                    orientation="vertical"
                    variant="scrollable"
                    value={activeLevel}
                    onChange={handleChangeTabs}
                    TabIndicatorProps={{
                      style: {
                        display: "none",
                      },
                    }}
                  >
                    {tabValue.map((k: any) => {
                      return (
                        <Tab
                          sx={{
                            textTransform: "capitalize",
                            "&.Mui-selected": {
                              backgroundColor: "#ffffff",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              padding: "4px 5px",
                              borderRadius: "5px",
                            },
                          }}
                          label={k}
                        />
                      );
                    })}
                  </Tabs>
                </Grid>

                <Grid position="relative" item xs={10}>
                  <Scroll>
                    <Scrollbar style={{ height: "calc(100vh - 360px)" }}>
                      <div
                        style={{ position: "absolute", paddingLeft: "250px" }}
                      >
                        
                      </div>
                      <Dialog
          open={open2}
          // onClose={handleClose2}
          BackdropProps={{
            style: { background: "#333333 !important", opacity: "10%" },
          }}
          PaperProps={{
            style: {
              boxShadow: "none",
              borderRadius: "6px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
              
            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                // width: "300px",
                alignItems: "center",
              }}
            >
              {levelUniqueness && (
                          <div>
                            Level definition values should not be the same with
                            other levels.
                            </div>
                         
                        )}
                        {objBehavioralUniqueness && (
                         <div>
                            Objective behavioral values should not be the same
                            with other levels.
                          </div>
                        )}
                        {dataRequired && (
                         <div>
                            Level definition & Behavioral Indicators data is
                            required for atleast one level.
                            </div>
                        )}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // paddingBottom: "30px"
            }}
          >
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color:"#3e8cb5",
                // marginRight: "10px",
                width: "70px",
                height: "35px",
                background: "transparent",
                
              }}
              onClick={handleClose3}
              variant="outlined"
              autoFocus
             
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
                      <TabPanel value={activeLevel} index={0}>
                        <div
                          style={{ paddingLeft: "30px", paddingBottom: "25px" }}
                        >
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                              paddingBottom: "5px"
                            }}
                          >
                            Level Definition
                          </Typography>
                          {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                                textTransform: "none",
                                fontFamily: "Arial",
                                color: "#333333",
                              },
                            }}
                            placeholder="Add"
                            inputProps={{ maxLength: 256 }}
                            style={{ width: "95%" }}
                            size="small"
                            multiline
                            maxRows={4}
                            onChange={(e) => {
                              setLevel_1_definition(e.target.value);
                              setnavPrompt(true);
                            }}
                            value={level_1_definition}
                            onKeyPress={(event: any) => {
                              var key = event.keyCode || event.which;
                              if (key === 13) {
                                levelobjectiveTitleHandler();
                                console.log("Enter Button has been clicked");
                              }
                            }}
                          // error={!level_1_definition && textfeildErrorLevel1}
                          // helperText={
                          //   !level_1_definition && textfeildErrorLevel1
                          //     ? "*Level Defenition required."
                          //     : " "
                          // }
                          />
                        </div>

                        <div style={{ paddingLeft: "30px" }}>
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",

                            }}
                          >
                            Behavioral Indicators
                          </Typography>
                          {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                          {level_1 &&
                            level_1.map((level: any, index: number) => {
                              return (
                                <>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    // paddingBottom="10px"
                                    // paddingTop="10px"
                                    // height="50px"
                                    spacing={2}
                                  >
                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      placeholder="Add"
                                      style={{
                                        width: "95%",
                                        paddingTop: "10px",
                                      }}
                                      size="small"
                                      multiline
                                      maxRows={4}
                                      key={index}
                                      inputProps={{ maxLength: 256 }}
                                      value={
                                        level_1[index].behavioral_objective
                                      }
                                      name="level_1"
                                      onChange={(e: any) => {
                                        handleChangeLevel1(e, index);
                                        setnavPrompt(true);
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          levelobjectiveTitleHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}

                                    //error={!level_1[index].behavioral_objective && behavioralobjLevel1}
                                    // helperText={
                                    //   !level_1[index].behavioral_objective && behavioralobjLevel1
                                    //     ? "*Behavioral Objective required."
                                    //     : " "
                                    // }
                                    />
                                    <Stack direction="column" alignItems="center">
                                      {level_1.length - 1 === index && (
                                        <Tooltip title="Add">
                                          <Icon>
                                            <IconButton

                                              onClick={handleLevelAdd1}
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}

                                      {/* {level_1.length !== index + 1 && ( */}
                                      {level_1.length !== 1 && (
                                        <Tooltip title="Delete">
                                          <Icon>
                                            <IconButton

                                              onClick={() =>
                                                handleLevelRemove1(index)
                                              }
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img
                                                src={Closeiconred}
                                                alt="icon"
                                              />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}
                                    </Stack>
                                  </Stack>
                                </>
                              );
                            })}
                        </div>
                      </TabPanel>

                      <TabPanel value={activeLevel} index={1}>
                        <div
                          style={{ paddingLeft: "30px", paddingBottom: "25px" }}
                        >
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                              paddingBottom: "5px"
                            }}
                          >
                            Level Definition
                          </Typography>
                          {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                                textTransform: "none",
                                fontFamily: "Arial",
                                color: "#333333",
                              },
                            }}
                            placeholder="Add"
                            inputProps={{ maxLength: 256 }}
                            style={{ width: "95%" }}
                            size="small"
                            multiline
                            maxRows={4}
                            onChange={(e: any) => {
                              setLevel_2_definition(e.target.value);
                              setnavPrompt(true);
                            }}
                            value={level_2_definition}
                            onKeyPress={(event: any) => {
                              var key = event.keyCode || event.which;
                              if (key === 13) {
                                levelobjectiveTitleHandler();
                                console.log("Enter Button has been clicked");
                              }
                            }}
                          />
                        </div>

                        <div style={{ paddingLeft: "30px" }}>
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                            }}
                          >
                            Behavioral Indicators
                          </Typography>
                          {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                          {level_2 &&
                            level_2.map((level: any, index: number) => {
                              return (
                                <>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    // paddingBottom="10px"
                                    // height="50px"
                                    spacing={2}
                                  >
                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      inputProps={{ maxLength: 256 }}
                                      placeholder="Add"
                                      style={{
                                        width: "95%",
                                        paddingTop: "10px",
                                      }}
                                      size="small"
                                      maxRows={4}
                                      multiline
                                      key={index}
                                      value={level_2[index].behavioral_objective}
                                      name="level_2"
                                      onChange={(e: any) => {
                                        handleChangeLevel2(e, index);
                                        setnavPrompt(true);
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          levelobjectiveTitleHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}
                                    />
                                    <Stack direction="column" alignItems="center">

                                      {level_2.length - 1 === index && (
                                        <Tooltip title="Add">
                                          <Icon>
                                            <IconButton
                                              onClick={handleLevelAdd2}
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}

                                      {level_2.length !== 1 && (
                                        <Tooltip title="Delete">
                                          <Icon>
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove2(index)
                                              }
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Closeiconred} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}
                                    </Stack>
                                  </Stack>
                                </>
                              );
                            })}
                        </div>
                      </TabPanel>
                      <div ref={scrollEnd}></div>
                      <TabPanel value={activeLevel} index={2}>
                        <div
                          style={{ paddingLeft: "30px", paddingBottom: "25px" }}
                        >
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                              paddingBottom: "5px"
                            }}
                          >
                            Level Definition
                          </Typography>
                          {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                                textTransform: "none",
                                fontFamily: "Arial",
                                color: "#333333",
                              },
                            }}
                            inputProps={{ maxLength: 256 }}
                            placeholder="Add"
                            style={{ width: "95%" }}
                            size="small"
                            multiline
                            maxRows={4}
                            onChange={(e: any) => {
                              setLevel_3_definition(e.target.value);
                              setnavPrompt(true);
                            }}
                            value={level_3_definition}
                            onKeyPress={(event: any) => {
                              var key = event.keyCode || event.which;
                              if (key === 13) {
                                levelobjectiveTitleHandler();
                                console.log("Enter Button has been clicked");
                              }
                            }}
                          />
                        </div>

                        <div style={{ paddingLeft: "30px" }}>
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                            }}
                          >
                            Behavioral Indicators
                          </Typography>
                          {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                          {level_3 &&
                            level_3.map((level: any, index: number) => {
                              return (
                                <>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    // paddingBottom="10px"
                                    // height="50px"
                                    spacing={2}
                                  >
                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      inputProps={{ maxLength: 256 }}
                                      placeholder="Add"
                                      style={{
                                        width: "95%",
                                        paddingTop: "10px",
                                      }}
                                      size="small"
                                      multiline
                                      key={index}
                                      maxRows={4}
                                      value={level_3[index].behavioral_objective}
                                      name="level_3"
                                      onChange={(e: any) => {
                                        handleChangeLevel3(e, index);
                                        setnavPrompt(true);
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          levelobjectiveTitleHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}
                                    />
                                    <Stack direction="column" alignItems="center">

                                      {level_3.length - 1 === index && (
                                        <Tooltip title="Add">
                                          <Icon>
                                            <IconButton
                                              onClick={handleLevelAdd3}
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}

                                      {level_3.length !== 1 && (
                                        <Tooltip title="Delete">
                                          <Icon>
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove3(index)
                                              }
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Closeiconred} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}
                                    </Stack>
                                  </Stack>
                                </>
                              );
                            })}
                        </div>
                      </TabPanel>

                      <TabPanel value={activeLevel} index={3}>
                        <div
                          style={{ paddingLeft: "30px", paddingBottom: "25px" }}
                        >
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                              paddingBottom: "5px"
                            }}
                          >
                            Level Definition
                          </Typography>
                          {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                          <TextField
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                                textTransform: "none",
                                fontFamily: "Arial",
                                color: "#333333",
                              },
                            }}
                            inputProps={{ maxLength: 256 }}
                            placeholder="Add"
                            style={{ width: "95%" }}
                            size="small"
                            multiline
                            maxRows={4}
                            onChange={(e: any) => {
                              setLevel_4_definition(e.target.value);
                              setnavPrompt(true);
                            }}
                            value={level_4_definition}
                            onKeyPress={(event: any) => {
                              var key = event.keyCode || event.which;
                              if (key === 13) {
                                levelobjectiveTitleHandler();
                                console.log("Enter Button has been clicked");
                              }
                            }}
                          />
                        </div>
                        <div style={{ paddingLeft: "30px" }}>
                          <Typography
                            style={{
                              color: "#3e8cb5",
                              fontSize: "16px",
                              fontFamily: "Arial",
                            }}
                          >
                            Behavioral Indicators
                          </Typography>
                          {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                          {level_4 &&
                            level_4.map((level: any, index: number) => {
                              return (
                                <>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    // paddingBottom="10px"
                                    // height="50px"
                                    spacing={2}
                                  >
                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      placeholder="Add"
                                      inputProps={{ maxLength: 256 }}
                                      style={{
                                        width: "95%",
                                        paddingTop: "10px",
                                      }}
                                      size="small"
                                      multiline
                                      key={index}
                                      maxRows={4}
                                      value={level_4[index].behavioral_objective}
                                      name="level_4"
                                      onChange={(e: any) => {
                                        handleChangeLevel4(e, index);
                                        setnavPrompt(true);
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          levelobjectiveTitleHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}
                                    />
                                    <Stack direction="column" alignItems="center">

                                      {level_4.length - 1 === index && (
                                        <Tooltip title="Add">
                                          <Icon>
                                            <IconButton
                                              onClick={handleLevelAdd4}
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}

                                      {level_4.length !== 1 && (
                                        <Tooltip title="Delete">
                                          <Icon>
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove4(index)
                                              }
                                              onKeyPress={(event: any) => {
                                                var key =
                                                  event.keyCode || event.which;
                                                if (key === 13) {
                                                  levelobjectiveTitleHandler();
                                                  console.log(
                                                    "Enter Button has been clicked"
                                                  );
                                                }
                                              }}
                                            >
                                              <img src={Closeiconred} alt="icon" />
                                            </IconButton>
                                          </Icon>
                                        </Tooltip>
                                      )}
                                    </Stack>
                                  </Stack>
                                </>
                              );
                            })}
                        </div>
                      </TabPanel>
                    </Scrollbar>
                  </Scroll>
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>

          {/* </Accordion> */}
        </div>
        {/* </Scrollbar> */}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          paddingTop="12px"
        // paddingTop="40px"
        >
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3e8cb5",
              color: "#3e8cb5",
              background: "transparent",
              height: "35px",
              width: "70px"
            }}
            variant="outlined"
            onClick={() => {
              levelobjectiveTitleHandler();
              //levelsuniqueHandler()
              //levelsSubmitHandler()
            }}
          >
            Save
          </Button>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3e8cb5",
              color: "#3e8cb5",
              background: "transparent",
              height: "35px",
              width: "70px"
            }}
            variant="outlined"
            onClick={() => {
              navigate(-1);
              cancelfun();
              updateObjectiveDescription({
                isTitleChecked: false,
                id: objectiveTitle,
              });
            }}
          >
            Cancel
          </Button>
        </Stack>
        <AlertDialogSuccess
           isAlertOpen={successfullyChanged}
           handleAlertClose={handleClicksuccessClose}
        >
          Changes have been saved.
        </AlertDialogSuccess>
      </Container>
    </>
  );
}