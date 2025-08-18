<template>    
    <div class="constantOptions">
        <div style="display: flex;">
            <p>Spaghetti Plot</p>
            <HoverWrapper :isMarginLeft="-20"
                        :isMarginTop="22"
                        :isWidth="20"
                        :isData="{
                            imageName: 'spaghetti-plot',
                            callback: spagToggle,
                            }"
                        :isComponent="'ClickIcon'"
                        :info="['Toggle spaghetti plot appearance behavior.']"
            />
        </div>
        <div style="display: flex;">
            <p>Legend</p>
            <Legend v-if="plotType == 0" :id="1"></Legend>
            <Legend v-if="plotType == 1" :id="2"></Legend>
            <Legend v-if="plotType == 2" :id="3"></Legend>
        </div>
        <div style="display: flex;">
            <p>Toggle Raw/Index</p>
            <HoverWrapper 
                        :isData="{
                            imageName: 'toggle-icon',
                            callback: toggleData,
                            }"
                        :isComponent="'ClickIcon'"
                        :info="['Legendary.']"
            />
        </div>
        <div>
            
        </div>
    </div>

    <div v-if="this.optionIDs.length === 0">
        <p class="no-option-text">Select specimen from loaded-data list to show plotting options.</p>
    </div>
    
    <div class="options-div" v-for="modal in this.modals">
        <div class="name-div">
            <p class="name" v-if="this.optionIDs.includes(modal.id)">{{ getName(modal.id) }}</p>
        </div>

        <OptionsModal 
                        :id="modal.id"
                        :optionSet="plotType"
                        v-if="this.optionIDs.includes(modal.id)"
        />
    </div>
</template>



<script>
import ClickIcon from './SubComponents/ClickIcon.vue'
import HoverWrapper from './SubComponents/HoverWrapper.vue'
import Legend from './SubComponents/Legend.vue'
import OptionsModal from './SubComponents/OptionsModal.vue'

export default {
    inject: ['store'],
    components: { HoverWrapper, OptionsModal, ClickIcon, Legend },
    props: ['optionIDs'],
    data () {
        return {
            modals: this.store.cache.modals,
        }
    },
    computed: {
        name: function() {
            if (this.store.states.current.find(o => this.optionIDs.includes(o.id))) {
                var optionName = this.store.states.current.find(o => o.id == this.optionIDs[0]).name
            }
            else { optionName = this.store.cache.states.find(o => o.id == this.optionIDs[0]).name }
            return optionName
        },
        rawActive: function() { return this.store.cache.plotStates[0] },
        plotType: function() { 
            return this.store.cache.plotStates.findIndex(e => e)
        },
    },
    methods: {
        spagToggle: function() {
            this.store.cache.spagActive = !this.store.cache.spagActive
            if (this.store.cache.spagActive) {
                let activeStates = this.store.states.current.filter(o => (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq))

                // find which plots are active. Apply medianA to plot 1, medianB to plot 2 (if active).
                let plot1Active = activeStates.some(o => (o.rawPlotLocation == 1 && (o.rawPointsActive || o.rawSplineFreq))
                                                        || (o.indexPlotLocation == 1 && (o.indexPointsFreq || o.indexSplineFreq)))
                let plot2Active = activeStates.some(o => (o.rawPlotLocation == 2 && (o.rawPointsActive || o.rawSplineFreq))
                                                        || (o.indexPlotLocation == 2 && (o.indexPointsFreq || o.indexSplineFreq)))

                if (plot1Active) {
                    this.store.methods.updateCache('states', 220, 'rawPointsActive', true)
                }
                if (plot2Active) {
                    this.store.methods.updateCache('states', 221, 'rawPlotLocation', 2)
                    this.store.methods.updateCache('states', 221, 'rawPointsActive', true)
                }
            } else {
                this.store.methods.updateCache('states', 220, 'rawPointsActive', false)
                this.store.methods.updateCache('states', 221, 'rawPointsActive', false)
            }

            this.store.cache.updatePlotSwitch = !this.store.cache.updatePlotSwitch
        },
        toggleData: function() {
            if (this.store.cache.plotStates[0]) {
                this.store.cache.plotStates = [false, true, false]
            } else {
                this.store.cache.plotStates = [true, false, false]
            }
        },
        getName: function(id) {
            if (this.store.states.current.find(o => o.id == id)) {
                var optionName = this.store.states.current.find(o => o.id == id).name
            }
            else { optionName = this.store.cache.states.find(o => o.id == id).name }
            return optionName
        }
    }
}


</script>

<style scoped>
p {
    margin: 0 5px;
}

.constantOptions {
    background-color: lightgreen;
    display: block;
    height: 65px;
}

.no-option-text {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 5px 5px ;
}

.options-div {
    display: grid;
}

.name {
    font-size: 16px;
    font-weight: 590;
}

.name-div {
    display: grid;
    justify-content: center;
    background-color: rgb(203, 207, 212);
}
</style>