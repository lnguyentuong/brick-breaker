import * as conf from './conf'
type Point = { x: number; y: number}
type Coord = { x: number; y: number; dx: number; dy: number }
type Ball = { coord: Coord; life: number; invincible?: number }
type Brick = { coord: Point, height: number, width: number, life: number; bonus?: number}
type Size = { height: number; width: number }
export type State = {
  pos: Array<Brick>
  ball: Ball
  size: Size
  player: Brick
  endOfGame: boolean
}

var kick = new Audio(process.env.PUBLIC_URL + "/Thwomp.wav");
var breaking = new Audio(process.env.PUBLIC_URL + "/Break.wav");
var bump = new Audio(process.env.PUBLIC_URL+"/Bump.wav")

const dist2 = (o1: Point, o2: Coord) =>
  Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2)

const iterate = (bound: Size, ball: Ball) => {
  const coord = ball.coord
  const dx =
    (coord.x + conf.RADIUS > bound.width || coord.x < conf.RADIUS
      ? -coord.dx
      : coord.dx) * conf.FRICTION
  const dy =
    (/* coord.y + conf.RADIUS > bound.height ||  */coord.y < conf.RADIUS
      ? -coord.dy
      : coord.dy) * conf.FRICTION
  if (Math.abs(dx) + Math.abs(dy) < conf.MINMOVE)
    return { ...ball, coord: { ...coord, dx: 0, dy: 0 } }
  return {
    ...ball,
    coord: {
      x: coord.x + dx,
      y: coord.y + dy,
      dx,
      dy,
    },
  }
}

export const click =
  (state: State) =>
  (event: PointerEvent): State => {
    const { offsetX, offsetY } = event
    const target = state.pos.find(
      (p) =>
        dist2(p.coord, { x: offsetX, y: offsetY, dx: 0, dy: 0 }) <
        Math.pow(conf.RADIUS, 2) + 100
    )
    if (target) {
      //target.coord.dx += Math.random() * 10
      //target.coord.dy += Math.random() * 10
    }
    return state
  }

const collide = (o1: Coord, o2: Coord) =>
  dist2(o1, o2) < Math.pow(2 * conf.RADIUS, 2)

const collideCircleBrick = (circle: Coord, box: Brick) => {
  let dxb1 = circle.x - box.coord.x;
  let dyb1 = circle.y - box.coord.y;

  let dxb2 = circle.x - box.coord.x;
  let dyb2 = circle.y - box.coord.y-box.height;

  let dxb3 = circle.x - box.coord.x - box.width;
  let dyb3 = circle.y - box.coord.y;

  let dxb4 = circle.x - box.coord.x - box.width;
  let dyb4 = circle.y - box.coord.y - box.height;

  //if(dxb1 * dxb1 + dyb1 * dyb1 <= (circle.radius + c2.radius) * (c1.radius + c2.radius)) return true;
  if(circle.x + conf.RADIUS >= box.coord.x && circle.x - conf.RADIUS <= box.coord.x+100
    && (dxb1 * dxb1 + dyb1 * dyb1 <= conf.RADIUS * conf.RADIUS
    || dxb2 * dxb2 + dyb2 * dyb2 <= conf.RADIUS * conf.RADIUS
    || dxb3 * dxb3 + dyb3 * dyb3 <= conf.RADIUS * conf.RADIUS
    || dxb4 * dxb4 + dyb4 * dyb4 <= conf.RADIUS * conf.RADIUS
    || (circle.y + conf.RADIUS >= box.coord.y && circle.y - conf.RADIUS <= box.coord.y + box.height))
  ){
    return true;
  }
  return false;
}

const collideBoing = (p1: Coord, p2: Brick) => {
  const nx = (p2.coord.x - p1.x) / (2 * conf.RADIUS)
  const ny = (p2.coord.y - p1.y) / (2 * conf.RADIUS)
  const gx = -ny
  const gy = nx

  const v1g = gx * p1.dx + gy * p1.dy
  const v2n = nx * 1 + ny * 1
  const v2g = gx * 1 + gy * 1
  const v1n = nx * p1.dx + ny * p1.dy

  if((p1.x < p2.coord.x || p1.x > p2.coord.x + p2.width) && p1.y >= p2.coord.y && p1.y <= p2.coord.y + p2.height){
    p1.dx = -p1.dx
  }
  if((p1.y < p2.coord.y || p1.y > p2.coord.y + p2.height) && p1.x >= p2.coord.x && p1.y <= p2.coord.x + p2.width){
    p1.dy = -p1.dy
  }
  else{
    p1.dx = -p1.dx
    p1.dy = -p1.dy
  }
  
  //p1.dx = -p1.dx //nx * v2n + gx * v1g
  //p1.dy = -p1.dy //ny * v2n + gy * v1g
  //p2.dx = nx * v1n + gx * v2g
  //p2.dy = ny * v1n + gy * v2g
  p1.x += p1.dx
  p1.y += p1.dy
  //p2.x += p2.dx
  //p2.y += p2.dy
}

export const step = (state: State) => {
  if (collideCircleBrick(state.ball.coord, state.player)) {
    
    kick.play();
    collideBoing(state.ball.coord, state.player)
  }
  state.pos.map((p1, i, arr) => {
    arr.slice(i + 1).map((p2) => {
      if (collideCircleBrick(state.ball.coord, p1)) {
        p1.life--
        if(p1.life==0) breaking.play();
        else bump.play()
        collideBoing(state.ball.coord, p1)
      }
    })
  })
  //let endOfGame = (state.ball.coord.y + conf.RADIUS > state.size.height)? true: false
  return {
    ...state,
    pos: state.pos.filter((p) => p.life > 0),
    ball: iterate(state.size, state.ball),
    //endOfGame: endOfGame
  }
}

export const mouseMove =
  (state: State) =>
  (event: PointerEvent): State => {
    return {
      ...state,
      player: {
        ...state.player,
        coord: {x: event.x, y: state.player.coord.y}
      }
    }
  }

export const endOfGame = (state: State): boolean => state.ball.coord.y + conf.RADIUS <= state.size.height
