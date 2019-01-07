import { createSelector } from 'reselect';
import { modalsSelector } from '../../redux';

export default createSelector(
    modalsSelector,
    modals => ({
        modalProps: modals.props[0],
        modalType: modals.types[0]
    })
);
