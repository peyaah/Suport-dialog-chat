var supportDialogComponent = Vue.component("support-dialog-component", {
  vuetify: new Vuetify(),
  methods: {
    init() {
      this.getProjectFeature();
      this.getSubscriptionPlan();
    },
    toogleChat() {
      
      if (this.isExpand) {
        if (this.$refs.supportSelectForm) {
          this.$refs.supportSelectForm.reset();
        }
        if (this.$refs.supportTextAreaForm) {
          this.$refs.supportTextAreaForm.reset();
        }
      } 
      else {
        this.showModalAcknowledgement = false;
      }
      this.isClicked = !this.isClicked;
      this.isExpand = !this.isExpand;
    },

    sendNewProject() {
      if (this.$refs.supportSelectForm.validate()) {
        console.log("Feature: ", this.projectFeature);
        console.log("Plan: ", this.subscriptionPlan);
        console.log("Other notes: ", this.noteText);
        this.$refs.supportSelectForm.reset();
        this.showModalAcknowledgement = true;
      }
    },
    sendSupport() {
      if (this.$refs.supportTextAreaForm.validate()) {
        console.log(this.supportText);
        this.$refs.supportTextAreaForm.reset(); 
        this.showModalAcknowledgement = true;
      }
    },
    resetValidNewProjectTab() {
      if (this.$refs.supportSelectForm) {
        this.$refs.supportSelectForm.resetValidation();
      }
    },
    resetValidSupportTab() {
      if (this.$refs.supportTextAreaForm) {
        this.$refs.supportTextAreaForm.resetValidation();
      }
    },
    getProjectFeature() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          app.$refs.support_dialog_component.projectFeatureResult = JSON.parse(this.responseText);
          console.log(this.projectFeatureResult);
        }
      };
      xhttp.open("GET", "project-feature.json", true);
      xhttp.send();
    },
    getSubscriptionPlan() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          app.$refs.support_dialog_component.subscriptionPlanResult = JSON.parse(this.responseText);
          console.log(this.subscriptionPlanResult);
        }
      };
      xhttp.open("GET", "subscription-plan.json", true);
      xhttp.send();
    },
  },
  data() {
    return {
      /*selectProjectFeature: [
        {
          description: "Select Project Feature",
          description: true,
        },
        { description: "BASIC" },
        { description: "PREMIUM" },
      ],

      selectSubscriptionPlan: [
        {
          description: "Select Subscription Plan",
          disable: true,
        },
        { description: "Project Based" },
        { description: "Annual Subscription" },
      ],*/

      supportDialogRule: [(v) => !!v /*Validation rule, when field is empty*/],

      isClicked: true,

      isExpand: false,
      showModalAcknowledgement: false,
      supportDialogValidation: true,

      tabs: null,
      noteText: "",
      supportText: "",
      projectFeature: "",
      subscriptionPlan: "",
      projectFeatureResult: "",
      subscriptionPlanResult: "",
    };
  },
  mounted() {
    this.init();
  },
  template: 
  `<div>
  <v-btn
    class="support-toggle-btn"
    id="chat-btn"
    v-if="isClicked"
    elevation="5"
    fab
    width="40"
    height="40"
    color="#f16026"
    @click="toogleChat"
    
  >
    <v-icon color="white">mdi-chat</v-icon>
  </v-btn>
  <v-btn
    class="support-toggle-btn"
    id="x-btn"
    v-else="isClicked"
    elevation="5"
    fab
    width="40"
    height="40"
    color="#f16026"
    @click="toogleChat"
  >
    <v-icon color="white">mdi-close-thick</v-icon>
  </v-btn>

  <div class="div-card">
    <v-expand-transition>
      <v-card tile max-width="300" height="420" elevation="5" v-show="isExpand">
        <div class="card-title-bar-div">
          <div class="first-text-div">
            <label class="first-text-label">Hi there!</label>
          </div>

          <div class="second-text-div">
            <label class="second-text-label"
              >Looking to start a new need support?</label
            >
          </div>
        </div>
        
        <div class="div-tabs-holder">
          <div v-if="showModalAcknowledgement" class="acknowledgement-message-div" >
            <label class="acknowledgement-label-1">Your message has been sent!</label>
            <br>
            <label class="acknowledgement-label-2">We will get back to you as soon as possible.</label>
          </div>
          <div class="div-tab">
            <v-tabs
              class="tab-selection"
              v-model="tabs"
              height="35"
              hide-slider
              fixed-tabs
            >
              <v-tab class="selection-tab" value="newProj" active-class="active" @click="resetValidSupportTab"> New Project </v-tab>
              <v-tab class="selection-tab" value="support" active-class="active" @click="resetValidNewProjectTab"> Support </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <v-card flat>
                  <v-card-text class="v-card-text">
                    <!-- DIALOG DROP DOWNS -->
                    <v-form ref="supportSelectForm" v-model="supportDialogValidation" lazy-required>
                      <div class="newProj-div-box">
                        <div class="div-selector">
                          <v-select
                            class="selection-drop-down"
                            :items="projectFeatureResult"
                            :rules="supportDialogRule"
                            label="Select Project Feature"
                            outlined
                            height="20"
                            flat
                            item-text="description"
                            item-value="id"
                            item-disabled="disable"
                            hide-details
                            v-model="projectFeature"
                            :menu-props="{ bottom: true, offsetY: true }"
                            dense
                          ></v-select>
                        </div>
                        <div class="div-selector">
                          <v-select
                            class="selection-drop-down"
                            :items="subscriptionPlanResult"
                            :rules="supportDialogRule"
                            label="Select Subscription Plan"
                            outlined
                            height="20"
                            flat
                            item-text="description"
                            item-value="id"
                            item-disabled="disable"
                            hide-details
                            v-model="subscriptionPlan"
                            :menu-props="{ bottom: true, offsetY: true }"
                            dense
                          ></v-select>
                        </div>
                        
                        <label class="label-notes-support">Other notes:</label>
                        <div>
                          <v-textarea
                            class="text-area-inputs"
                            outlined
                            height="112"
                            flat
                            no-resize
                            hide-details
                            v-model="noteText"
                          ></v-textarea>
                        </div>
                      </div>
                    </v-form>
                    <div class="send-btn-div">
                      <v-btn
                        id="send-btn"
                        Primary
                        color="#f16026"
                        width="80"
                        height="33"
                        @click="sendNewProject"
                      >
                      <v-icon color="white" size="20">mdi-send</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div>
                      <v-form ref="supportTextAreaForm" v-model="supportDialogValidation" lazy-required>
                        <div class="newProj-div-box">
                          <div>
                            <label class="label-notes-support">Ask for support:</label>
                            <div>
                              <v-textarea
                                class="text-area-inputs"
                                outlined
                                :rules="supportDialogRule"
                                flat
                                height="197"
                                no-resize
                                hide-details
                                v-model="supportText"
                              ></v-textarea>
                            </div>
                          </div>
                        </div>
                      </v-form>
                    </div>
                    <div class="send-btn-div">
                      <v-btn
                        id="send-btn"
                        Primary
                        color="#f16026"
                        width="80"
                        height="33"
                        @click="sendSupport"
                      >
                        <v-icon color="white" size="20">mdi-send</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>
          
        </div>
      </v-card>
    </v-expand-transition>
  </div>
</div>`,
});
