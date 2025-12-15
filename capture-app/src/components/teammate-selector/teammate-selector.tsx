import { useState } from "react"
import styles from "./teammate-selector.module.css"
import { Autocomplete, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form"

type Teammate = {
  label: string
  id: number
}

type Inputs = {
  teammateName: string
}
export default function TeammateSelector({
  setTeammateId,
}: {
  setTeammateId: React.Dispatch<React.SetStateAction<number>>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  })

  // TODO:   change to an API call
  const [teammates, setTeammates] = useState<Teammate[]>([
    { label: "Mitchell", id: 1 },
    { label: "Luke", id: 2 },
    { label: "Lesego", id: 3 },
    { label: "Nigel", id: 4 },
    { label: "Saxon", id: 5 },
    { label: "Alexey", id: 6 },
  ])

  const [selectedTeammate, setSelectedTeammate] = useState<
    Teammate | null | string
  >(null)
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
    <form
      className={styles.selectorWrapper}
      onSubmit={handleSubmit(handleAddTeammate)}
    >
      <Autocomplete
        disablePortal
        freeSolo
        options={teammates}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teammate"
            {...register("teammateName", {
              required: "Please select or add a teammate.",
              maxLength: 30,
              minLength: {
                value: 1,
                message: "bloo blah",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "A teammate name can only contain letters.",
              },
            })}
            error={errors.teammateName ? true : false}
            helperText={errors.teammateName?.message}
          />
        )}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        value={selectedTeammate}
        onChange={(event, newValue: Teammate | null | string) => {
          setSelectedTeammate(newValue)
          setTeammateId(
            newValue && typeof newValue === "object" ? newValue.id : 0
          )
        }}
      />

      <Button type="submit" disabled={!noResults} variant="contained">
        Add
      </Button>
    </form>
  )
}
