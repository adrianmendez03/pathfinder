export interface Cell {
  cell: any
  coords: Coords
}

export interface Coords {
  x: number
  y: number
}

export interface Bound {
  start: number
  end: number
}

export interface Bounds {
  x: Bound
  y: Bound
}
