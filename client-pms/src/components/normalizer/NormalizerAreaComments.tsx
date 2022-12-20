import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import Blueadd from './Reviewericons/Blueadd.svg';
import Blueminus from './Reviewericons/Blueminus.svg';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from '../../context/normalizerContext';



const TrainingRecommendations = styled("div")({
    marginLeft: "25px",
    marginTop: '10px',
    color: '#008E97',
    fontSize: '13px',
    opacity: 0.85
});

const Tf = styled('div')({
    marginLeft: "25px",
    marginTop: "5px",
    fontSize: '13x',
    width: "93%",
    backgroundColor: '#FFFFFF',
    '& .MuiInputLabel-root': {
        color: '#333333',
        opacity: '0.5',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
    },
});
const Contain = styled("div")({
    marginRight: "20px",
    marginTop: "10px",

});

const NAreaofImprovementComments = (props: any) => {

    // @ts-ignore
    const { normalizerAreaImprovementComments, setNormalizerAreaImprovementComments, } = useNormalizerContext();
    const [ comments, setComments ] = useState('');

   
    
      const handleCommentsChange = (e: any) => {
        console.log(e);
        setComments(e.target.value)
    }   

    useEffect(() => {
        //@ts-ignore
        // console.log(checkboxIdHandler(checkboxHandler(users)))
       setNormalizerAreaImprovementComments(comments)
      }, [comments]);

    return (
        <div>
            <TrainingRecommendations>
                 Area of Improvement Justification (Normalizer)
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField 
                        // fullWidth
                            multiline
                            inputProps={{ maxLength: 512 }}

                            size='small'
                            name="comments"
                            value={normalizerAreaImprovementComments || ""}
                            onChange={e => handleCommentsChange(e)} />
                    </Tf>
                </Box>
                </Contain>
        </div>
    );
}

export default NAreaofImprovementComments

