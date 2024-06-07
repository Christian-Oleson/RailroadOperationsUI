import Box from "@mui/material/Box/Box";
import {fetchClassifications} from "../api/classification-api-client/classification";
import React, {useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';

export const Classification = () => {
    const [classifications, setClassifications] = useState<Classifications>({} as Classifications);

    let values : unknown[];

     fetchClassifications().then((response) => {
         // @ts-ignore
         values = Object.values(response[0]);
         let localClassification = {} as Classifications;
         localClassification.Classifications = [];

         values.map((value, index) => {
             localClassification.Classifications.push({
                 id: index,
                 // @ts-ignore
                 name: value as string
             });
        })

         if (classifications.Classifications == undefined || classifications.Classifications.length === 0) {
             setClassifications(localClassification);
         }

         console.log(localClassification.Classifications);
    }).catch((error) => {
        console.error(error);
    });

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
            <Paper elevation={3}>
            <Typography sx={{textAlign: 'center'}} variant="h3">Classifications</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Classification ID</TableCell>
                            <TableCell>Classification Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classifications?.Classifications?.map((classification) => {
                            return (
                                <TableRow key={classification.id}>
                                    <TableCell>{classification.id}</TableCell>
                                    <TableCell>{classification.name}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Box>
    )
}