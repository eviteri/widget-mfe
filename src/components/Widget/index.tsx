import React from 'react'
import './Widget.css'

interface WidgetProps {
  title?: string
}

const Widget: React.FC<WidgetProps> = ({ title = 'App 2 Widget' }) => {
  return (
    <div className="widget-wrapper" data-e2e="APP_2__WIDGET">
      <h2>{title}</h2>
      <p>This is a widget from Remote App 2.</p>
    </div>
  )
}

export default Widget
