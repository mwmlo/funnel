import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { onValue, ref } from "firebase/database";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectView = ({ userId, groupId, updateGroupId, setImages }) => {

    if (userId === "") {
        return <></>
    }

    /* Fetch a list of all user groups on loading. */
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        let groupsList = new Set();
        const userDbRef = ref(database, userId);
        onValue(userDbRef, (snapshot) => {
            const userGroups = snapshot.toJSON();
            for (let group in userGroups) {
                groupsList.add(group);
            }
            setGroups(Array.from(groupsList.values()));
        });
    }, []);

    const updateGroup = (e) => {
        setImages([]);
        updateGroupId(e.target.value);
    }

    function renderOption(name) {
        const saved = localStorage.getItem("groupId");
        if (name === saved) {
            return <MenuItem selected value={name}>{name}</MenuItem>
        }
        return <MenuItem value={name}>{name}</MenuItem>
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="select-group-label-id">Subject name</InputLabel>
            <Select
                labelId="select-group-label-id"
                id="select-group"
                value={groupId}
                label="Subject Name"
                onChange={updateGroup}
            >
                {groups.map(name => renderOption(name))}
            </Select>
        </FormControl>
    )
}

export default SelectView