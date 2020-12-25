import React, {useState} from 'react'

// ts4.x feature
type S1 = 'A'
type S2 = 'B'
type S3 = `${S1} ${S2}`

interface Props {
  a: number
  b: number
  c: S3
}

export default ({a, b, c}: Props) => {
  const value = useState(a + b)
  return <div>
    <label>{c}</label>
    <span>{value}</span>
  </div>
}
