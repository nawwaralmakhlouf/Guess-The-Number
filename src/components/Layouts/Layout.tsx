'use strict';
import * as React from 'react';

import { AppConfig } from '../../utils/App.config';

export default function Layout(children: any) {
  children = children.children ? children.children : children;
  const headerData = children.props ? children.props : children;
  const meta = headerData.meta ? headerData.meta : AppConfig;
  return (
    <>
      <div className="flex items-stretch h-screen min-h-screen">
        <div className="mx-auto w-full h-screen p-4">{children}</div>
      </div>
    </>
  );
}
