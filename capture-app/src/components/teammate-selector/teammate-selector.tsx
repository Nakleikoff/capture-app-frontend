import { useState } from "react"
import styles from "./teammate-selector.module.css"
import { Autocomplete, Button, TextField } from "@mui/material"
type Teammate = {
  label: string
  id: number
}
export default function TeammateSelector({ setTeammateId } : { setTeammateId: React.Dispatch<React.SetStateAction<number>> }) {
  // TODO:   change to an API cal
  const [teammates, setTeammates] = useState<Teammate[]>([
    { label: "Mitchell", id: 1 },
    { label: "Luke", id: 2 },
    { label: "Lesego", id: 3 },
    { label: "Nigel", id: 4 },
    { label: "Saxon", id: 5 },
    { label: "Alexey", id: 6 },
  ])

  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null | string>(
    null
  )
  const [inputValue, setInputValue] = useState("")

  const handleAddTeammate = () => {
    if (
      inputValue &&
      !teammates.some((teammate) => teammate.label === inputValue)
    ) {
      // this is just dummy code for adding a teammate to the list. This will change to an API call to add a teammate
      const highestId = Math.max(...teammates.map((t) => t.id), 0)
      setTeammates((prevTeammates) => [
        ...prevTeammates,
        { label: inputValue, id: highestId + 1 },
      ])
      setInputValue("")
    }
  }

  const filtered = teammates.filter((t) =>
    t.label.toLowerCase().includes(inputValue.toLowerCase())
  )
  const noResults = filtered.length === 0

  return (
    <div className={styles.selectorWrapper}>
      <Autocomplete
        disablePortal
        freeSolo
        options={teammates}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Teammate" />}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        value={selectedTeammate}
        onChange={(event, newValue: Teammate | null | string) => {
          setSelectedTeammate(newValue)
          setTeammateId(newValue && typeof newValue === "object" ? newValue.id : 0)
        }}
      />
      <Button
        onClick={() => handleAddTeammate()}
        disabled={!noResults}
        variant="contained"
      >
        Add
      </Button>
    </div>
  )
}
