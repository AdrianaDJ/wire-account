/*
 * Wire
 * Copyright (C) 2020 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import React from 'react';
import {ReactWrapper} from 'enzyme';
import {act} from '@testing-library/react';
import {mountComponent} from './TestUtil';
import {History} from 'history';
import {createMemoryHistory} from 'history';

export default class TestPage<T> {
  private readonly driver: ReactWrapper;
  private readonly props: T;

  constructor(
    Component: React.FC<T> | React.ComponentClass<T>,
    props?: T,
    history: History<any> = createMemoryHistory(),
  ) {
    this.props = props;
    this.driver = mountComponent(<Component {...this.props} />, history);
  }

  getProps = () => this.props;

  get = (selector: string) => this.driver.find(selector);

  private readonly do = (action: Function) => {
    act(() => {
      action();
    });
    this.update();
  };
  click = (element: ReactWrapper) => this.do(() => element.simulate('click'));
  changeValue = (element: ReactWrapper, value: string) => this.do(() => element.simulate('change', {target: {value}}));
  changeFiles = (element: ReactWrapper, files: File[]) => this.do(() => element.simulate('change', {target: {files}}));
  submit = (element: ReactWrapper) => this.do(() => element.simulate('submit'));
  mouseEnter = (element: ReactWrapper) => this.do(() => element.simulate('mouseenter'));
  keyCodeUp = (element: ReactWrapper, keyCode: number) => this.do(() => element.simulate('keyup', {keyCode}));
  keyCodeDown = (element: ReactWrapper, keyCode: number) => this.do(() => element.simulate('keydown', {keyCode}));

  update = () => this.driver.update();
  // eslint-disable-next-line no-console
  debug = (element?: ReactWrapper) => console.log((element ? element : this.driver).debug());
}
