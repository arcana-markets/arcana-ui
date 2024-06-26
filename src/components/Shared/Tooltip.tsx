import React, { HTMLAttributes, ReactNode } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/animations/scale.css'

type TooltipProps = {
  content: ReactNode
  placement?: TippyProps['placement']
  className?: string
  children?: ReactNode
  delay?: number
  show?: boolean
  maxWidth?: string
}

const Tooltip = ({
  children,
  content,
  className,
  placement = 'top',
  delay = 0,
  maxWidth = '20rem',
}: TooltipProps) => {
  return (
  <Tippy
    animation="scale"
    placement={placement}
    appendTo={() => document.body}
    maxWidth={maxWidth}
    interactive
    delay={[delay, 0]}
    content={
      content && (
        <div
          className={`rounded-md bg-[#012A36] p-3 cursor-default font-body text-center text-xs leading-4 text-white outline-none focus:outline-none ${className}`}
          style={{ 
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.25)',
            maxWidth: '360px',
            minWidth: typeof content === 'string' && content.length > 43 ? '360px' : 'auto'
          }}
        >
          {content}
        </div>
        )
      }
    >
      <div className="z-50 outline-none focus:outline-none">{children}</div>
    </Tippy>
  )
}

const Content = ({
  className,
  children,
}: {
  className?: string
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`inline-block cursor-help border-b border-dashed border-white ${className}`}
    >
      {children}
    </div>
  )
}

Tooltip.Content = Content

export default Tooltip
