import {render, screen} from '@testing-library/react';
import React from 'react';
import Render from './Render';


describe('Rendering', () => {it('Should render all the elements', () => {
                        render(<Render />);
                        // screen.debug()
                        // screen.debug(screen.getByRole('heading'));
                        // toBeTruthy()は存在を判定する。
                        expect(screen.getByRole('heading')).toBeTruthy();
                        expect(screen.getByRole('textbox')).toBeTruthy();
                        expect(screen.getAllByRole('button')[0]).toBeTruthy();
                        expect(screen.getAllByRole('button')[1]).toBeTruthy();
                        expect(screen.getByText('udemy')).toBeTruthy();
                        // ないことを証明
                        expect(screen.queryByText('Uddy')).toBeNull();
                        expect(screen.getByTestId('copyright')).toBeTruthy();
                      })})