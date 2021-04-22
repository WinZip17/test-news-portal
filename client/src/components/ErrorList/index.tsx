import React from "react"
import Typography from "@material-ui/core/Typography";

const ErrorList = ({ errors }: { errors: string[] }): JSX.Element => {
  return (
    <div>
      {errors.map((error, index) => {
        return (
          <Typography key={index.toString()} variant="subtitle2" gutterBottom color={"error"}>
            {error}
          </Typography>
        )
      })}
    </div>
  )
}

export default ErrorList
