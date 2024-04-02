import { FC, memo } from "react";
import TdpRange from "./components/molecules/TdpRange";
import { TdpSlider } from "./components/molecules/TdpSlider";
import { PollTdp } from "./components/molecules/PollTdp";
import { store } from "./redux-modules/store";
import { Provider, useSelector } from "react-redux";
import { TdpProfiles } from "./components/molecules/TdpProfiles";
import {
  useFetchInitialStateEffect,
  useIsInitiallyLoading,
} from "./hooks/useInitialState";
import Gpu from "./components/molecules/Gpu";
import AdvancedOptions, {
  useIsSteamPatchEnabled,
} from "./components/molecules/AdvancedOptions";
import OtaUpdates from "./components/molecules/OtaUpdates";
import ErrorBoundary from "./components/ErrorBoundary";
import { SteamPatchDefaultTdpSlider } from "./components/molecules/SteamPatchDefaultTdpSlider";
import PowerControl from "./components/molecules/PowerControl";
import { DeckySection } from "./components/atoms/DeckyFrontendLib";
import { useIsDesktop } from "./hooks/desktopHooks";

const App: FC = memo(({}) => {
  useFetchInitialStateEffect();

  const loading = useIsInitiallyLoading();

  const isDesktop = useIsDesktop();
  const steamPatchEnabled = useIsSteamPatchEnabled();

  return (
    <>
      {!loading && (
        <>
          <DeckySection>
            <TdpProfiles isDesktop={isDesktop} />
            {!isDesktop && !steamPatchEnabled && (
              <>
                <TdpSlider />
                <Gpu />
              </>
            )}
          </DeckySection>
          <PowerControl />
          {!isDesktop && steamPatchEnabled && <SteamPatchDefaultTdpSlider />}
          <TdpRange />
          <PollTdp />
          <AdvancedOptions />
          {!isDesktop && (
            <ErrorBoundary title="OTA Updates">
              <OtaUpdates />
            </ErrorBoundary>
          )}
        </>
      )}
    </>
  );
});

const AppContainer: FC = ({}) => {
  return (
    <Provider store={store}>
      <ErrorBoundary title="App">
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

export default AppContainer;
