<template>
  <v-container>
  	<v-expansion-panel
      v-for="field in fields"
      :key="field.subComponent.questionNumber"
    >
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">{{field.name}}</v-col>
           
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         
          <v-text-field
            v-model="field[field.name]"
            placeholder="type your question"
          ></v-text-field>
          
  		<ChoiceInput
        v-bind="field.subComponent.props"
        v-bind:modeEdit="modeEdit"
      ></ChoiceInput>

        </v-expansion-panel-content>
      </v-expansion-panel>
</v-container>

</template>

<script>
import ChoiceInput from './ChoiceInput.vue';
  
  export default {

    name: "QuestionInput",
    components: {
      ChoiceInput,
    },
    data() {
      return{
        data:{

        }
      }
    },

    props: {
        fields: {
          
          type: Array,
        },
        modeEdit: {
          type:Boolean,
        }
    },

  };

</script>