import * as conf from './conf'
import { useRef, useEffect } from 'react'
import { State, step, click, mouseMove, endOfGame } from './state'
import { render } from './renderer'

const randomInt = (max: number) => Math.floor(Math.random() * max)
const randomSign = () => Math.sign(Math.random() - 0.5)

const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
  (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    requestAnimationFrame(() => iterate(ctx))
  }

const Canvas = ({ height, width }: { height: number; width: number }) => {
  let Xbricks = new Array()
  let x = 0
  let nbBox = 0
  while(x < width){
    x+=100
    nbBox++
  }
  let y = 0
  let Ybricks = new Array()
  for(let j = 0; j<conf.NBLINES;j++){
    x = 0
    for(let i = 0;i<nbBox;i++){
      Xbricks.push(x)
      Ybricks.push(y)
      x += 100
    }
    y += 30
  }
  const initialState: State = {
    pos: new Array(nbBox*conf.NBLINES).fill(1).map((_, index) => ({
      life: conf.BRICKLIFE,
      coord: {
        x: Xbricks[index] ,
        y: Ybricks[index] ,
      },
      height: 30,
      width : 100
    })),
    ball: {
      life: conf.BRICKLIFE,
      invincible: -1,
      coord: {
        x: 500,//randomInt(width - 120) + 60,
        y: 500,//randomInt(height - 120) + 60,
        dx: -5,//4 * randomSign(),
        dy: -5,//4 * randomSign(),
      }},
    size: { height, width },
    player : {
      coord: {x: width/2, y: height-40},
      height: 30,
      width: 100,
      life: 10000
    },
    endOfGame: true,
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)

  const iterate = (ctx: CanvasRenderingContext2D) => {
    state.current = step(state.current)
    state.current.endOfGame = !endOfGame(state.current)
    render(ctx)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }
  const onClick = (e: PointerEvent) => {
    state.current = click(state.current)(e)
  }

  const onMove = (e: PointerEvent) => {
    state.current = mouseMove(state.current)(e)
  }
  useEffect(() => {
    if (ref.current) {
      initCanvas(iterate)(ref.current)
      ref.current.addEventListener('click', onClick)
      ref.current.addEventListener('mousemove', onMove)
    }
    return () => {
      ref.current.removeEventListener('click', onMove)
      ref.current.removeEventListener('mousemove', onMove)
    }
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas
