interface Props {
  registros: string[]
}

export default function HistorialAlquiler({ registros }: Props) {

  return (
    <div>

      <h2>Historial de alquileres</h2>

      {registros.map((r, i) => (
        <div key={i}>{r}</div>
      ))}

    </div>
  )

}